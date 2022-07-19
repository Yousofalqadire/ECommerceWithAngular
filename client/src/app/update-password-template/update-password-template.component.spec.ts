import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdatePasswordTemplateComponent } from './update-password-template.component';

describe('UpdatePasswordTemplateComponent', () => {
  let component: UpdatePasswordTemplateComponent;
  let fixture: ComponentFixture<UpdatePasswordTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePasswordTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
