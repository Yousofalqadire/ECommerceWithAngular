import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, user } from 'Models/user';
import { Observable } from 'rxjs';
import{Role,IRole} from '../Models/role'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 basUrl ='https://localhost:5001/api/Admin';
  constructor(private http :HttpClient) { }

creatRole(model:Role) :Observable<string>
{
  return this.http.post<string>(this.basUrl+'/creat-role' ,model)

}
 getRoles() :Observable<Array<IRole>>
 {
  let user:IUser = JSON.parse(localStorage.getItem('user'));
  let  header = new HttpHeaders({
    'Authorization':'Bearer '+user.token   
  });
  let option = {headers:header}
  return this.http.get<Array<IRole>>(this.basUrl+'/get-roles',option);
 }

 getUsers():Observable<Array<user>>
 {
  let user:IUser = JSON.parse(localStorage.getItem('user'));
  let  header = new HttpHeaders({
    'Authorization':'Bearer '+user.token   
  });
  let option = {headers:header}
   return this.http.get<Array<user>>(this.basUrl+'/get-users',option);
 }

}
