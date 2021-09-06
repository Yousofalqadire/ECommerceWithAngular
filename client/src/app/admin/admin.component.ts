import { Component, OnInit } from '@angular/core';
import { IRole, Role } from 'Models/role';
import { user } from 'Models/user';
import { AdminService } from 'services/admin.service';
import { ScriptService } from 'services/script.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  roles:Array<IRole>=[];
  users : Array<user> = [];
  constructor(private scriptService:ScriptService, private adminService:AdminService) { }

  ngOnInit(): void {

    this.getRoles();
    this. getUsers();
    
    this.scriptService.loadAdminScriptFile();
    
  }


  getRoles()
  {
    this.adminService.getRoles().subscribe(res=>
      {
        this.roles = res;
       
        
      })

  }

  getUsers()
  {
    this.adminService.getUsers().subscribe(res=>
      {
        this.users = res;
        console.log(this.users);
      })
  }
}
