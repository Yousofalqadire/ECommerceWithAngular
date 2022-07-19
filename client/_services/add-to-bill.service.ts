import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import{ environment } from '../src/environments/environment';
import{AddToBill} from '../src/_models/add-to-bill'
import { Observable } from 'rxjs';
import {User} from '../src/_models/user'


@Injectable({
  providedIn: 'root'
})
export class AddToBillService {
  baseUrl = environment.baseUrl+'Bill/saveBill'
  constructor(private http:HttpClient) { }

  confirmBill(model:AddToBill):Observable<any>
  {
    let user:User = JSON.parse(localStorage.getItem('user'));
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ user.token
    });
    let headerOption ={headers:httpHeaders}
     return this.http.post<any>(this.baseUrl , JSON.stringify(model),headerOption);
  }
}
