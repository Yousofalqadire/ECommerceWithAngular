import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginData } from 'src/_models/loginData';
import { IRegister } from 'src/_models/register';
import { User} from '../src/_models/user';
import {UserManagerResponse} from '../src/_models/registerResponse';
import { EmailValidator } from '@angular/forms';
import { PresenceService } from './presence.service';
import {ForgetPassword} from '../src/_models/forgetpassword'
import { environment } from 'src/environments/environment';
import{UpdatePassword} from '../src/_models/update-password';
// import jwt_decode from "jwt-decode";
let  header = new HttpHeaders({
  'Content-Type':'application/json'
  
});
let option = {headers:header}
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient,private presence:PresenceService) { }

  baseUrl = environment.baseUrl;
  private currentUserSource = new ReplaySubject<User>(1);
   currentUser$ = this.currentUserSource.asObservable();
   private currintUserManagerResponseSource = new ReplaySubject<UserManagerResponse>(1);
   currentUserManagerResponse$ = this.currintUserManagerResponseSource.asObservable();
    
  register(model:IRegister)
  {
    return this.http.post<UserManagerResponse>(this.baseUrl+'Account/register', JSON.stringify(model), option )
  }
    login(model:LoginData)
    {
     let roles =[];
      return this.http.post<User>(this.baseUrl +'Account/login',JSON.stringify(model),option).pipe(
        map((response:User)=>{
          const user = response;
          if(user){
        const decoaded=this.decodToken(user.token);
        const properetys =[]
        for(let prop in decoaded)
        {
          properetys.push(decoaded[prop]);  
        }
        let [email,username,nameidentifier,role] = properetys; //destuctaring the decoaded object
        user.roles =[];
        Array.isArray(role)? user.roles = role : user.roles.push(role);
        user.nameidentifier = nameidentifier;
           localStorage.setItem('user',JSON.stringify(user));
           this.currentUserSource.next(user);
           this.presence.creatConnection(user);
          } 
        })
      )
    }
  
     setCurrentUser(user:User)
    {
      this.currentUserSource.next(user);
    }
  
    logout()
    {
      localStorage.removeItem('user');
      this.currentUserSource.next(null);
      this.presence.stopConnection();
    }
    sendResetPasswordToken(model:ForgetPassword):Observable<UserManagerResponse>
    {
       return this.http.post<UserManagerResponse>(this.baseUrl +
         'Account/ForgetPassword',JSON.stringify(model),option);
    }
    updatePassword(model:UpdatePassword):Observable<UserManagerResponse>
    {
      return this.http.post(this.baseUrl +'Account/update-password',JSON.stringify(model),option);
    }

    decodToken(token:string)
    {
      let jwtdata = token.split('.')[1];
    let decodejwt = window.atob(jwtdata);
    let decodeJwtData = JSON.parse(decodejwt);
    return decodeJwtData;
    }
}
