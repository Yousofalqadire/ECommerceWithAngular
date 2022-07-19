import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms'; 
import { ForgetPassword } from 'src/_models/forgetpassword';
import { UserManagerResponse } from 'src/_models/registerResponse';
import { AccountService } from '_services/account.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private fb:FormBuilder,private accountService:AccountService,
              private matSnackBar:MatSnackBar) { }
   GetTokenForm = this.fb.group({
     email: new FormControl('',[Validators.required,Validators.email])
   });
   userManagerResponse:UserManagerResponse;
   horizintalSnakBarPosition:MatSnackBarHorizontalPosition ="center";
   verticalSnakBarPosition:MatSnackBarVerticalPosition = 'bottom';
  ngOnInit(): void {
    this.initialForm();
  }

  initialForm()
  {
    return this.GetTokenForm.controls;
  }
  getToken()
  {
    const ForgetPasswod:ForgetPassword ={Email:this.GetTokenForm.get('email').value}
     this.accountService.sendResetPasswordToken(ForgetPasswod).subscribe(res=>{
       this.userManagerResponse = res;
       this.matSnackBar.open(`${this.userManagerResponse.massege} ` ,'X',{
        horizontalPosition:this.horizintalSnakBarPosition,
        verticalPosition:this.verticalSnakBarPosition
       })
     })

  }
}
