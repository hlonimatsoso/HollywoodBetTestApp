import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailListComponent } from './event-detail-list.component';

describe('EventDetailListComponent', () => {
  let component: EventDetailListComponent;
  let fixture: ComponentFixture<EventDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
