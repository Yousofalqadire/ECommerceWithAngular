import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashBoardLandingComponent } from './dash-board-landing.component';

describe('DashBoardLandingComponent', () => {
  let component: DashBoardLandingComponent;
  let fixture: ComponentFixture<DashBoardLandingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
