import { TestBed } from '@angular/core/testing';

import { EventDetailMessageBusService } from './event-detail-message-bus.service';

describe('EventDetailMessageBusService', () => {
  let service: EventDetailMessageBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventDetailMessageBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
