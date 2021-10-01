import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChooseLinkDialogComponent } from './choose-link-dialog.component';

describe('ChooseLinkDialogComponent', () => {
  let component: ChooseLinkDialogComponent;
  let fixture: ComponentFixture<ChooseLinkDialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChooseLinkDialogComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
