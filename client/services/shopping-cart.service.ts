import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from 'Models/cartItem';
import { IUser } from 'Models/user';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
  
})
export class ShoppingCartService {
 
  baseUrl = 'https://localhost:5001/api/ShoppingCarts';
  constructor(private http :HttpClient)
  { 
    
  }

  addProduct(item:CartItem):Observable<any>
  {
    let user:IUser = JSON.parse(localStorage.getItem('user'));
let  header = new HttpHeaders({
  'Content-Type':'application/json',
  'Authorization':'Bearer '+user.token 
});
let option = {headers:header}
    
    return this.http.post<CartItem>(this.baseUrl +'/add-item',JSON.stringify(item),option);
    
      
  }
  getAllProduct():Observable<Array<CartItem>>
  {
    let user:IUser = JSON.parse(localStorage.getItem('user'));
let  header = new HttpHeaders({
  'Content-Type':'application/json',
  'Authorization':'Bearer '+user.token
  
});
let option = {headers:header}
    return this.http.get<Array<CartItem>>(this.baseUrl,option);
  }

  getProductById(id:number):Observable<CartItem>
  {
    let user:IUser = JSON.parse(localStorage.getItem('user'));
let  header = new HttpHeaders({
  'Content-Type':'application/json',
  'Authorization':'Bearer '+user.token
  
});
let option = {headers:header}
    return this.http.get<CartItem>(this.baseUrl+id,option);
  }
  
  getUserCart(username:string):Observable<Array<CartItem>>
  {
    let user:IUser = JSON.parse(localStorage.getItem('user'));
let  header = new HttpHeaders({
  'Content-Type':'application/json',
  'Authorization':'Bearer '+user.token
  
});
let option = {headers:header}
    return this.http.get<Array<CartItem>>(this.baseUrl+'/?username='+username,option);
  }
  
  removeItem(id:number) :Observable<number>
  {
    let user:IUser = JSON.parse(localStorage.getItem('user'));
     let  header = new HttpHeaders({
  'Content-Type':'application/json',
  'Authorization':'Bearer '+user.token
  
});
let option = {headers:header}
    return  this.http.delete<number>(this.baseUrl+"/"+id,option);
  }
  
}
