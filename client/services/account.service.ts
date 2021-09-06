import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import{ILogin} from 'Models/ILogin'
import{IRegister} from 'Models/IRegister';
import { IUser } from 'Models/user';
import {map} from 'rxjs/operators'
import { Observable, ReplaySubject } from 'rxjs';
import jwt_decode from "jwt-decode";


let  header = new HttpHeaders({
  'Content-Type':'application/json',
  
});
let option = {headers:header}
@Injectable({
  providedIn: 'root'
})
export class AccountService {

 
  constructor(private http:HttpClient ) { }

  baseUrl ='https://localhost:5001/api/Account/';
   private currentUserSource = new ReplaySubject<IUser>(1);
   currentUser$ = this.currentUserSource.asObservable();
 
  login(model:ILogin)
  {
    return this.http.post<IUser>(this.baseUrl + "login",JSON.stringify(model),option).pipe(
      map((respons:IUser)=>{
        const user = respons;
        if(user)
        {
          user.roles=[];
          const decoded = this.getDecodeToken(user.token); 
          let _role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          Array.isArray(_role)? user.roles = _role: user.roles.push(_role);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          console.log(user);
        }         
      })
    )
  }

  //helper method
  setCuurentUser(user:IUser)
  {
    this.currentUserSource.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logOut()
  {
    localStorage.removeItem('user');
   return this.currentUserSource.next(null);
  }

  register(model : IRegister)
  {
    return this.http.post<IRegister>(this.baseUrl+'register',JSON.stringify(model),option);
  }

  getDecodeToken(token)
  {
    let jwtdata = token.split('.')[1];
    let decodejwt = window.atob(jwtdata);
    let decodeJwtData = JSON.parse(decodejwt);
    return decodeJwtData;
  } 
}
