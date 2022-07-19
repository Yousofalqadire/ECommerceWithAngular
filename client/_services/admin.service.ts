import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from 'src/_models/members';
import { User } from 'src/_models/user';
import{ Product} from '../src/_models/product'
import {Bill} from '../src/app/admin/adminModels/bill';
import {BillDetail} from '../src/app/admin/adminModels/bill-details';
import {Role} from '../src/app/admin/adminModels/role'
import{UserNotInRol} from '../src/app/admin/adminModels/user-not-in-role'
import{AddToRoleResponce} from '../src/app/admin/adminModels/addToRoleResponse'
import {AddUserToRoleDto} from '../src/app/admin/adminModels/add-user-to-role';
import{AddRole} from '../src/app/admin/adminModels/add-role';
import {AddRoleResponce} from '../src/app/admin/adminModels/addRoleResponce';
import {RemoveRoleResponce} from '../src/app/admin/adminModels/removeRoleResponce';
import {PaginatedResult,Pagination} from '../src/_models/pagination';
import { map } from 'rxjs/operators';
import {UpdateBill} from '../src/app/admin/adminModels/update-bill';
import {Sale} from '../src/app/admin/adminModels/sale'


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.baseUrl;
  member : Member[] = [];
  paginationResult : PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
  constructor(private http :HttpClient) { }

  addProduct(model:any ):Observable<Product>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))

    let _httpHeader = new HttpHeaders({
      'Authorization':'Bearer '+ user.token
    })
    let _headers ={headers:_httpHeader}
  return this.http.post<Product>(this.baseUrl + 'Product/add-product',model,_headers)
  }

  deleteItem(id:number) :Observable<string>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))

    let _httpHeader = new HttpHeaders({
      'Authorization':'Bearer '+ user.token
    })
    let _headers ={headers:_httpHeader}
    return this.http.delete<string>(this.baseUrl + "Product/"+id,_headers);
  }
  
  getUsers(page?:number,itemsPerPage?:number)
  {
//     let user :User = JSON.parse(localStorage.getItem('user'))
// let httpHeaders = new HttpHeaders({
//   'Content-Type':'application/json',
//   'Authorization':'Bearer '+ user.token
// })
// let headers ={headers:httpHeaders};
let params = new HttpParams();
if(page !== null && itemsPerPage !== null)
{
 params = params.append('pageNumber',page.toString());
 params =  params.append('pageSize',itemsPerPage.toString());


}
  
    return this.http.get<Member[]>(this.baseUrl+'Admin/git-users',
    {observe:'response',params}).pipe(
      map(res =>{
        this.paginationResult.result = res.body;
        if(res.headers.get('Pagination') != null)
        {
          this.paginationResult.Pagination = JSON.parse(res.headers.get('Pagination'));
        }
        return this.paginationResult;
      })
    )
  }

  getBills() : Observable<Array<Bill>>
  {  let user :User = JSON.parse(localStorage.getItem('user'))
  let httpHeaders = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Bearer '+ user.token
  })
  let headers ={headers:httpHeaders};
   return this.http.get<Array<Bill>>(this.baseUrl +'Bill/git-bills',headers)
  }
  getBillDetails(id:number) : Observable<Array<BillDetail>>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ user.token
    })
    let headers ={headers:httpHeaders};
    return this.http.get<Array<BillDetail>>(this.baseUrl +'Bill/'+id,headers )
  }
 
  getRoles():Observable<Role[]>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ user.token
    })
    let headers ={headers:httpHeaders};
    return this.http.get<Role[]>(this.baseUrl +'Admin/get-roles',headers)
  }
  getUsersNotInRol(roleName:string):Observable<UserNotInRol[]>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ user.token
    })
    let headers ={headers:httpHeaders};
    return this.http.get<UserNotInRol[]>(this.baseUrl +'Admin/GetUsersNotInRole/?id='+roleName,headers)
  }
  addUserToRole(addUserToRole:AddUserToRoleDto):Observable<AddToRoleResponce>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ user.token
    })
    let headers ={headers:httpHeaders};
    return this.http.post<AddToRoleResponce>(this.baseUrl +'Admin/add-user-to-role', JSON.stringify(addUserToRole),headers)
  }
  creatNewRole(role:AddRole):Observable<AddRoleResponce>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ user.token
    })
    let headers ={headers:httpHeaders};
    return this.http.post<AddRoleResponce>(this.baseUrl +'Admin/creat-role',JSON.stringify(role),headers)

  }
  
removeRole(roleId:string):Observable<RemoveRoleResponce>
{
  let user :User = JSON.parse(localStorage.getItem('user'))
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ user.token
    })
    let headers ={headers:httpHeaders};
  return this.http.delete<RemoveRoleResponce>(this.baseUrl + 'Admin/delete-role/?id='+roleId,headers)
}
  updateProduct(model:any):Observable<Product>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))
    let httpHeaders = new HttpHeaders({
      'Authorization':'Bearer '+ user.token
    })
    let headers ={headers:httpHeaders};
    return this.http.put<Product>(this.baseUrl +'Product/update-product',model,headers)
  }
  updateBill(model:UpdateBill):Observable<Bill>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ user.token
    })
    let headers ={headers:httpHeaders};
    return this.http.put<Bill>(this.baseUrl + 'Bill/update-bill',JSON.stringify(model),headers);

  }
  addToSale(id:number):Observable<Sale>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ user.token
        })
    let headers ={headers:httpHeaders};
    return this.http.post<Sale>(this.baseUrl +'Bill/add-to-sales/'+id,headers)

  }
  getSalesYears():Observable<number[]>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ user.token
    })
    let headers ={headers:httpHeaders};
     return this.http.get<number[]>(this.baseUrl +'Sales/get-yers',headers)
  }
  getMonthByYear(year:number):Observable<number[]>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ user.token
    })
    let headers ={headers:httpHeaders};
    return this.http.get<number[]>(this.baseUrl +'Sales/get-months/'+year,headers)
  }
  getSalesByMonth(month:number):Observable<Sale[]>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+ user.token
    })
    let headers ={headers:httpHeaders};
    return this.http.get<Sale[]>(this.baseUrl +'Sales/get-sales-by-month/'+month,headers)
  }
  getBillById(billId:number):Observable<Bill>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))
    let httpHeaders = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Bearer '+ user.token
  })
  let headers ={headers:httpHeaders};
    return this.http.get<Bill>(this.baseUrl +'Bill/get-bill-byId/'+ billId,headers);
  }
  addCurosel(model:any):Observable<any>
  {
    let user :User = JSON.parse(localStorage.getItem('user'))
  let httpHeaders = new HttpHeaders({
    'Authorization':'Bearer '+ user.token
  })
  let headers ={headers:httpHeaders};
    
    return this.http.post<any>(this.baseUrl +'Curosel/creat-curosel',model,headers);
  }
}
