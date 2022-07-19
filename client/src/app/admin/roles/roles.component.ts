import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '_services/admin.service';
import { AddRoleDialogComponent } from '../add-role-dialog/add-role-dialog.component';
import { AddRole } from '../adminModels/add-role';
import { AddRoleResponce } from '../adminModels/addRoleResponce';
import { RemoveRoleResponce } from '../adminModels/removeRoleResponce';
import {Role} from '../adminModels/role'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  horizintalSnakBarPosition:MatSnackBarHorizontalPosition ="center";
  verticalSnakBarPosition:MatSnackBarVerticalPosition = 'bottom';
  roles :Role[];
  dataSource;
  displayColumns:Array<string> = ['id','name','addUsers','delete']
  constructor(private adminService:AdminService,private dialog:MatDialog,private matSnakBar:MatSnackBar) { }

  ngOnInit(): void {
   this.getRoles();
  }

  getRoles()
  {
    this.adminService.getRoles().subscribe(res=>{
      this.roles = res;
      this.dataSource = new MatTableDataSource<Role>(this.roles)
    })
  }
  openAddRoleDialog()
  {
    let addRoleDialogRef = this.dialog.open(AddRoleDialogComponent,{
      width:'500px',
      height:'400px',
      data:{}
    })
     addRoleDialogRef.afterClosed().subscribe(res=>{
       let addRole:AddRole={RoleName:res.roleName};
       this.adminService.creatNewRole(addRole).subscribe(res=>{       
         this.matSnakBar.open(`${res.responce}`,'X',{
         horizontalPosition:this.horizintalSnakBarPosition,
         verticalPosition:this.verticalSnakBarPosition
         })
       })
     })
  }
  removeRole(id:string)
  {
    this.adminService.removeRole(id).subscribe(res=>{
      this.matSnakBar.open(`${res.responce}`,'X',{
        horizontalPosition:this.horizintalSnakBarPosition,
        verticalPosition:this.verticalSnakBarPosition
        });
       this.getRoles();
    })
  }
}
