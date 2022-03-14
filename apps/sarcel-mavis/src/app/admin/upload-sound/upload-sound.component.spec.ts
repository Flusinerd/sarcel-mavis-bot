import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSoundComponent } from './upload-sound.component';

describe('UploadFileComponent', () => {
  let component: UploadSoundComponent;
  let fixture: ComponentFixture<UploadSoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
