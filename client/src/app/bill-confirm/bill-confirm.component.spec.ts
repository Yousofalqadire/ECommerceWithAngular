import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BillConfirmComponent } from './bill-confirm.component';

describe('BillConfirmComponent', () => {
  let component: BillConfirmComponent;
  let fixture: ComponentFixture<BillConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BillConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
