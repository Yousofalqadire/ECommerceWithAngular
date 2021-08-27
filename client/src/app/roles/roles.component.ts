import { Component, OnInit } from '@angular/core';
import { IRole } from 'Models/role';
import { AdminService } from 'services/admin.service';
import { ScriptService } from 'services/script.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
 
  roles:Array<IRole>=[];
  constructor(private adminService:AdminService,private scriptService:ScriptService) { }

  ngOnInit(): void {
    this.getRoles();
    this.scriptService.loadAdminScriptFile();
  }

  getRoles()
  {
    this.adminService.getRoles().subscribe(res=>
      {
        this.roles = res;
        console.log(this.roles);
        
      })

  }
}
