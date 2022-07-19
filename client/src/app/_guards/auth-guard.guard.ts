import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
 
  constructor(private accountService:AccountService,private router:Router){}
  canActivate(): Observable<boolean>  {
    return this.accountService.currentUser$.pipe(
      map(user=>{
        if(user) return true;
       this.router.navigateByUrl('/home/error-page');
        
      })
     
    )
  }
  
}
