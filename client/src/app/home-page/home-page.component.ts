import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '_services/account.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import {LoginData} from '../../_models/loginData'
import { User } from 'src/_models/user';
import { ProductsService } from '_services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
currintMember:User;
categorys:Array<string>;
  constructor(private dialog:MatDialog,public accountService:AccountService 
    , private productServic:ProductsService) { }

  ngOnInit(): void {
     this. getCurrintUser();
     this.productServic.getCategorys().subscribe(res=>{
       this.categorys= res;
     })
    
     
  }

  openLoginDialog(){
    let dialogRef = this.dialog.open(LoginDialogComponent,{
      width:'500px',
      height:'500px',
      data:{}
    })
    dialogRef.afterClosed().subscribe(res=>{
    const member : LoginData ={Email:res.Email,Password:res.Password};
    this.accountService.login(member).subscribe();

  })
  }

 getCurrintUser()
 {
    this.accountService.currentUser$.subscribe(user=>{
      this.currintMember = user;
    })
 }

 logout()
 {
   this.accountService.logout();
 }

}
