import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '_services/admin.service';
import { AddUserToRoleDto } from '../adminModels/add-user-to-role';
import { UserNotInRol } from '../adminModels/user-not-in-role';

@Component({
  selector: 'app-add-users-to-role',
  templateUrl: './add-users-to-role.component.html',
  styleUrls: ['./add-users-to-role.component.css']
})
export class AddUsersToRoleComponent implements OnInit {
roleId:string;
users:UserNotInRol[];
displayColumns:string[]=['firstName','lastName','email','id','add'];
dataSource;
  constructor(private adminService:AdminService,private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(res=>{
      this.roleId = res.get('id');

    })
    this.getUsers();
  }
  getUsers()
  {
    this.adminService.getUsersNotInRol(this.roleId).subscribe(res=>{
      this.users = res;
      this.dataSource = new MatTableDataSource<UserNotInRol>(this.users);
    })
  }
  addUserToRole(userId:string)
  {
     const model:AddUserToRoleDto ={RoleId:this.roleId,UserId:userId};
     this.adminService.addUserToRole(model).subscribe(res=>{
      this.getUsers();
     })
  }
}
