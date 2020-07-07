import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventToolBarComponent } from './event-tool-bar.component';

describe('EventToolBarComponent', () => {
  let component: EventToolBarComponent;
  let fixture: ComponentFixture<EventToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventToolBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
