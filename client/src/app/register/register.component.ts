import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { UserManagerResponse } from 'src/_models/registerResponse';
import { AccountService } from '_services/account.service';
import { IRegister} from '../../_models/register';
import {LoaderService} from '../../../_services/loader.service'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
export interface City{
  name:string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
 
})
export class RegisterComponent implements OnInit {
  userManagerResponse:UserManagerResponse;
  hide = true;
  city :City[] = [
    {name:'الرمثا'},
    {name:'اربد'},
    {name:'جرش'},
    {name:'عجلون'},
    {name:'المفرق'},
    {name:'عمان'},
    {name:'السلط'},
    {name:'مادبا'},
    {name:'الكرك'},
    {name:'الطفيلة'},
    {name:'معان'},
    {name:'العقبة'}
    
  ]
  constructor(private fb:FormBuilder,private accountService:AccountService,
    public loaderService:LoaderService,private matSnackBar:MatSnackBar) { }

    horizintalSnakBarPosition:MatSnackBarHorizontalPosition ="center";
    verticalSnakBarPosition:MatSnackBarVerticalPosition = 'bottom';

  ngOnInit(): void {
    this.initialForm();
    this.setRegisterResponse();
    
  }

  registerForm = this.fb.group({
   Email: new FormControl('',[Validators.required]),
   Password:new FormControl('',[Validators.required, Validators.minLength(8)]),
   ConfirmPassword: new FormControl('',[Validators.required, this.matchValue('Password')]),
   BirthDay:new FormControl('',[Validators.required]),
   City:new FormControl('',[Validators.required]),
   FirstName:new FormControl('',[Validators.required]),
   LastName:new FormControl('',[Validators.required])

  });

initialForm()
{
  return this.registerForm.controls;
 
}
  
formatDate(date)
{
 let  d = new Date(date);
  let month = '' + (d.getMonth()+1);
  let day = ''+ (d.getDate());
  let year = ''+(d.getFullYear());
  if(month.length < 2)
  month = '0' + month;
  if(day.length < 2)
  day = "0" + day;
  return [day,month,year].join('/');
}

 creatAccount()
 {
      const birthday :Date = this.registerForm.get('BirthDay').value
      const _birthday = this.formatDate(birthday);

      const newMember :IRegister ={
        Email : this.registerForm.get('Email').value,
        Password : this.registerForm.get('Password').value,
        ConfirmPassword : this.registerForm.get('ConfirmPassword').value,
        City : this.registerForm.get('City').value,
        FirstName : this.registerForm.get('FirstName').value,
        LastName : this.registerForm.get('LastName').value,
        BirthDay:_birthday

      }
       this.accountService.register(newMember).subscribe(res=>{
         this.matSnackBar.open(`${res.massege}`,"X",{
           horizontalPosition:this.horizintalSnakBarPosition,
           verticalPosition:this.verticalSnakBarPosition,
         })
       })
    
 }

  setRegisterResponse()
  {
    this.accountService.currentUserManagerResponse$.subscribe(res=>{
     this.userManagerResponse = res;
    })
  }
 matchValue(matchTo:string):ValidatorFn
 {
   return (control:AbstractControl)=>{
     return control?.value === control?.parent?.controls[matchTo].value? null :
     {isMatching: true}
   }
 }

}
