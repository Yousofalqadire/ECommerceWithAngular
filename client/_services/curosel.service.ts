import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/_models/user';
import { AccountService } from './account.service';
import {Curosel} from '../src/app/admin/adminModels/curosel'

@Injectable({
  providedIn: 'root'
})
export class CuroselService {

  constructor(private http:HttpClient,private accountService:AccountService) { }
 
  baseUrl = environment.baseUrl;
   

   getCurosel():Observable<Curosel[]>
   {
    //  let user:User = JSON.parse(localStorage.getItem('user'))
    //  let httpHeaders = new HttpHeaders({
    //    'Authorization':`Bearer ${user.token}`,      
    //  });
    //  let headers = {headers:httpHeaders};
     return this.http.get<Curosel[]>(this.baseUrl +'Curosel/get-all');
   }
}
