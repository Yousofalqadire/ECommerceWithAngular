import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/_models/user';
import{ShoppingCart} from '../src/_models/shoppingCart'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
baseUrl = environment.baseUrl+'ShoppingCarts/'

  constructor(private http:HttpClient) { }

  getUserCart(username:string):Observable<Array<ShoppingCart>>
  {
    let user:User = JSON.parse(localStorage.getItem('user'));
    let httpHeader = new HttpHeaders({
      'Authorization':`Bearer ${user.token}`
    })
    let option ={headers:httpHeader}

    return this.http.get<Array<ShoppingCart>>(this.baseUrl +'?username='+username,option);

  }

  deleteItem(id:number):Observable<number>
  {
    let user:User = JSON.parse(localStorage.getItem('user'));
    let httpHeader = new HttpHeaders({
      'Authorization':`Bearer ${user.token}`
    })
    let option ={headers:httpHeader}
     return this.http.delete<number>(this.baseUrl+ id,option)
  }
}
