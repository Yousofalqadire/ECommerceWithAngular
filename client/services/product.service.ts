import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import{IProduct, Product} from '../Models/product';
import{map} from 'rxjs/operators';
import { IUser } from 'Models/user';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private categorys = new ReplaySubject<any>();
  // catecory$ = this.categorys.asObservable();
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getProduct(id:number): Observable<Product>
  {
     return this.http.get<Product>(this.baseUrl+'Product/'+id);
  }

  getProducts():Observable<Array<Product>>
  {
    return this.http.get<Array<Product>>(this.baseUrl+'Product');
  }
  getProductByCategory(name:string):Observable<Array<Product>>
  {
    return this.http.get<Array<Product>>(this.baseUrl + 'product/getProductByCategory/?name='+name);
  }

  getCategorys() : Observable<any>
  {
    return this.http.get<any>(this.baseUrl +'Product/get-categorys');
  }

  addProduct(model:any):Observable<Product>
  {
    let user:IUser = JSON.parse(localStorage.getItem('user'));
  let  header = new HttpHeaders({
    'Authorization':'Bearer '+user.token ,
     
  });
  let option = {headers:header}
  
    return this.http.post<Product>(this.baseUrl +"Product/add-product",model,option);
  }
}


//get-categorys