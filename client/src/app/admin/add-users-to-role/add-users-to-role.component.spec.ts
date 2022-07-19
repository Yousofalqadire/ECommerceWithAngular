import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddUsersToRoleComponent } from './add-users-to-role.component';

describe('AddUsersToRoleComponent', () => {
  let component: AddUsersToRoleComponent;
  let fixture: ComponentFixture<AddUsersToRoleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsersToRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersToRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
