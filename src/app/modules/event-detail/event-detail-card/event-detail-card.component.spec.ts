import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailCardComponent } from './event-detail-card.component';

describe('EventDetailCardComponent', () => {
  let component: EventDetailCardComponent;
  let fixture: ComponentFixture<EventDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
