import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdatePassword } from 'src/_models/update-password';
import { AccountService } from '_services/account.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UserManagerResponse } from 'src/_models/registerResponse';

@Component({
  selector: 'app-update-password-template',
  templateUrl: './update-password-template.component.html',
  styleUrls: ['./update-password-template.component.css']
})
export class UpdatePasswordTemplateComponent implements OnInit {
token:string;
email:string;
hide = true;
userManagerResponse:UserManagerResponse;
horizintalSnakBarPosition:MatSnackBarHorizontalPosition ="center";
verticalSnakBarPosition:MatSnackBarVerticalPosition = 'bottom';

  constructor(private route:ActivatedRoute,private fb:FormBuilder,
              private accountService:AccountService,
              private matSnackBar:MatSnackBar) { }
updatePasswordForm = this.fb.group({
  password:new FormControl('',[Validators.required]),
  confirmPassword:new FormControl('',[Validators.required,this.matchValue('password')])
});
  ngOnInit(): void {
  this.token = this.route.snapshot.queryParams["token"];
  this.email = this.route.snapshot.queryParams["email"];
  this.initialForm();
  }


  initialForm()
  {
    return this.updatePasswordForm.controls;
  }

  updatePassword()
  {
    let model:UpdatePassword ={
      Email:this.email,
      Token :this.token,
      Password: this.updatePasswordForm.get('password').value
    }
    this.accountService.updatePassword(model).subscribe(res=>{
      this.userManagerResponse = res;
      this.matSnackBar.open(`${this.userManagerResponse.massege} ` ,'X',{
        horizontalPosition:this.horizintalSnakBarPosition,
        verticalPosition:this.verticalSnakBarPosition
       })
    }, error=>console.log(error)
    )
      
  }

  matchValue(matchTo:string):ValidatorFn
  {
    return (control:AbstractControl)=>{
      return control?.value === control?.parent?.controls[matchTo].value? null :
      {isMatching: true}
    }
  }
}
