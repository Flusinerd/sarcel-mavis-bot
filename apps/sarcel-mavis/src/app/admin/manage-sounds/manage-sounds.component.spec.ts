import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSoundsComponent } from './manage-sounds.component';

describe('ManageSoundsComponent', () => {
  let component: ManageSoundsComponent;
  let fixture: ComponentFixture<ManageSoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSoundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
