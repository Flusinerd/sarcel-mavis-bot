import { Component, ViewEncapsulation, NgModule, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscordUserDto } from '../api/models/discord-user-dto';

@Component({
  selector: 'sarcel-mavis-discord-user-badge',
  templateUrl: './discord-user-badge.component.html',
  styleUrls: ['./discord-user-badge.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DiscordUserBadgeComponent implements OnInit {
  @Input() user?: DiscordUserDto;

  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [DiscordUserBadgeComponent],
  exports: [DiscordUserBadgeComponent],
})
export class DiscordUserBadgeComponentModule {}
