import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import{ environment } from '../src/environments/environment'
import { Observable } from 'rxjs';
import{Product} from '../src/_models/product'
import{User} from '../src/_models/user'
let header = new HttpHeaders({
  "Content-Type":"application/json"
})
let headerOption = {header:header} 

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
baseUrl = environment.baseUrl
  constructor(private http:HttpClient) { }



  getProducts() :Observable<Product[]>
  {
    return this.http.get<Product[]>(this.baseUrl+'Product');

  }

  getProductById(id:number):Observable<Product>
  {
    return this.http.get<Product>(this.baseUrl+'Product/'+id);
  }

  getProductByCategory(category:string):Observable<Product[]>
  {
    return this.http.get<Array<Product>>(this.baseUrl + 'product/getProductByCategory?name='+category);
  }

  getCategorys() : Observable<any>
  {
    return this.http.get<any>(this.baseUrl +'Product/get-categorys');
  }
  getProductAndroid(id:number):Observable<Product>{
  return this.http.get<Product>(this.baseUrl + "Android/"+ id);
  }
}
