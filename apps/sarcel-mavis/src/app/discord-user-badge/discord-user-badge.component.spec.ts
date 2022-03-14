import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordUserBadgeComponent } from './discord-user-badge.component';

describe('DiscordUserBadgeComponent', () => {
  let component: DiscordUserBadgeComponent;
  let fixture: ComponentFixture<DiscordUserBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscordUserBadgeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscordUserBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
