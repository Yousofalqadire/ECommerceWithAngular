import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddCuroselItemComponent } from './add-curosel-item.component';

describe('AddCuroselItemComponent', () => {
  let component: AddCuroselItemComponent;
  let fixture: ComponentFixture<AddCuroselItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCuroselItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCuroselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
