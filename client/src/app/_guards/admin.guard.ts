import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/_models/user';
import { AccountService } from '_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService:AccountService,private router:Router){}
  canActivate(): Observable<boolean> {
   return this.accountService.currentUser$.pipe(
     map((user:User)=>{
       if(user && user.roles.includes('Admin')) return true;
       else 
       {
        this.router.navigateByUrl('/home/error-page');
       }
     })
   )
  }
  
}
