import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailStatusComponent } from './event-detail-status.component';

describe('EventDetailStatusComponent', () => {
  let component: EventDetailStatusComponent;
  let fixture: ComponentFixture<EventDetailStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
