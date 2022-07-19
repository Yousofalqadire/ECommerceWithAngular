import { Component, OnInit } from '@angular/core';
import { User } from 'src/_models/user';
import { AccountService } from '_services/account.service';
import { PresenceService } from '_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';

  constructor(private accountService:AccountService,private presence:PresenceService){}
  ngOnInit(): void {
    this.setCurrintUser();
  }
  setCurrintUser(){
    const user :User =JSON.parse(localStorage.getItem('user'));
    if(user)
    {
      this.accountService.setCurrentUser(user);
      this.presence.creatConnection(user);
    }
    
    
  }
  
}
