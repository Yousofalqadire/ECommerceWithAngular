import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'Models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from 'services/account.service';
import { ScriptService } from 'services/script.service';
declare var $ : any;
@Component({
  selector: 'header-c',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   
   admin:boolean = false;
  constructor(private scriptService : ScriptService, 
    public accountService:AccountService,
    private router:Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
   this.getCuurentUser();
  this.scriptService.loadScripFile();
    
  }

  currentUser:IUser;
   
   getCuurentUser()
   {
     this.accountService.currentUser$.subscribe(res=>{
       this.currentUser = res;
     })
   }
  logout()
  {
   this.accountService.logOut();
    this.router.navigateByUrl('/home/login');

  }


}
