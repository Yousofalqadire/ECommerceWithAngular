import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { AddToCart } from '../src/_models/add-to-cart';
import {User} from '../src/_models/user';
import{Product} from '../src/_models/product'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor(private http :HttpClient) { }

  baseUrl = environment.baseUrl ;


  addToCart(model:AddToCart):Observable<Product>
  {
    const user:User = JSON.parse(localStorage.getItem('user'));
    let httpHeader = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer '+ user.token
    })
    let option = {headers:httpHeader}

    return this.http.post<Product>(this.baseUrl +'ShoppingCarts/add-item',JSON.stringify(model),option)
  }
}
