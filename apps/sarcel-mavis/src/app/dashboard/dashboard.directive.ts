import { Directive, OnInit } from '@angular/core';
import { AudioFileDto } from '../api/models/audio-file-dto';
import { AudioFilesService } from '../api/services/audio-files.service';
import { lastValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BotService } from '../api/services/bot.service';

@Directive({
  selector: '[sarcelMavisDashboard]'
})
export class DashboardDirective implements OnInit {

  $data!: Observable<Dashboard>;

  constructor(
    private readonly _audioFileService: AudioFilesService,
    private readonly _botService: BotService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.$data = this._audioFileService.getAllAudioFiles({ withCategories: true })
      .pipe(map(data => new Dashboard(data)));
  }


  async onSoundClick(audioFile: AudioFileDto): Promise<void> {
    await lastValueFrom(this._botService.playSound({
      body: {
        soundId: audioFile.id,
        userId: '1'
      }
    }))
  }

}

class Dashboard {
  categories: Category[] = [];

  constructor(data: AudioFileDto[]) {
    const categories = data.reduce((acc, cur) => {
      if (!cur.audioFileCategories) {
        return acc;
      }
      const categories = cur.audioFileCategories;
      for (const category of categories) {
        const existingCategory = acc.find(c => c.id === category.id);
        // If the category is already in the list, add the audio file to the existing category
        const letter = cur.name.trim().charAt(0).toUpperCase();
        if (existingCategory) {
          existingCategory.addAudioFile(letter, cur);
        } else {
          // Otherwise, create a new category and add the audio file to it
          const newCat = new Category(category.id, category.name, category.description).addAudioFile(letter, cur);
          acc.push(newCat);
          acc.sort((a, b) => a.name.localeCompare(b.name));
        }
      }
      return acc;
    }, this.categories);
    console.log(categories);
  }
}

class Category {
  id: string;
  name: string;
  description?: string;
  rows: DashboardRow[] = [];

  constructor(id: string, name: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  public addAudioFile(letter: string, file: AudioFileDto) {
    const row = this.rows.find(r => r.letter === letter);
    if (row) {
      row.sounds.push(file);
    } else {
      this.rows.push(new DashboardRow(letter, [file]));
      // Order the rows by their letter
      this.rows.sort((a, b) => a.letter.localeCompare(b.letter));
    }
    return this;
  }

}

class DashboardRow {
  letter: string;
  sounds: AudioFileDto[] = [];

  constructor(letter: string, sounds: AudioFileDto[]) {
    this.letter = letter;
    this.sounds = sounds;
  }
}
