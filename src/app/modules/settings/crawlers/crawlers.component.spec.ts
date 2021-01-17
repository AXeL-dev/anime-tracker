import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlersComponent } from './crawlers.component';

describe('CrawlersComponent', () => {
  let component: CrawlersComponent;
  let fixture: ComponentFixture<CrawlersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
