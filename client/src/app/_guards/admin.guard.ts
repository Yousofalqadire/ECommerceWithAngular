import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import{ToastrService} from 'ngx-toastr';
import {AccountService} from '../../../services/account.service'
import { map } from 'rxjs/operators';
import{IUser} from '../../../Models/user'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService:AccountService,private toastr:ToastrService){}
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map((user :IUser)=>{
        if(user.roles.includes('Admin')) return true;
        this.toastr.error('access denide');
      })
    )
  }
  
}
