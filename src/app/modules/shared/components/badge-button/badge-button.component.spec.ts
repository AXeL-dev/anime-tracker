import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeButtonComponent } from './badge-button.component';

describe('BadgeButtonComponent', () => {
  let component: BadgeButtonComponent;
  let fixture: ComponentFixture<BadgeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
