import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonthsSalesDialogComponent } from './months-sales-dialog.component';

describe('MonthsSalesDialogComponent', () => {
  let component: MonthsSalesDialogComponent;
  let fixture: ComponentFixture<MonthsSalesDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthsSalesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthsSalesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
