import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentToolBarComponent } from './tournament-tool-bar.component';

describe('TournamentToolBarComponent', () => {
  let component: TournamentToolBarComponent;
  let fixture: ComponentFixture<TournamentToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentToolBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
