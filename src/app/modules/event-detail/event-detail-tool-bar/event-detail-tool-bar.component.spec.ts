import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailToolBarComponent } from './event-detail-tool-bar.component';

describe('EventDetailToolBarComponent', () => {
  let component: EventDetailToolBarComponent;
  let fixture: ComponentFixture<EventDetailToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailToolBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
