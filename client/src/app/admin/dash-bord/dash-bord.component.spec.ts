import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashBordComponent } from './dash-bord.component';

describe('DashBordComponent', () => {
  let component: DashBordComponent;
  let fixture: ComponentFixture<DashBordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
