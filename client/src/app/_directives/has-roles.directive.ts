import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from 'src/_models/user';
import { AccountService } from '_services/account.service';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective implements OnInit {

  constructor(private viewConatinerRef:ViewContainerRef,
              private templateRef:TemplateRef<any>,
              private accountService:AccountService) {
                this.accountService.currentUser$.pipe(take(1)).subscribe(res=>{
                  this.user = res;
                })
               }
   user:User; 
   @Input() appHasRoles:string[];          
  ngOnInit(): void {
    if(!this.user?.roles || this.user == null)
    {
      this.viewConatinerRef.clear();
      return
    }
    if(this.user?.roles.some(r=> this.appHasRoles.includes(r))){
      this.viewConatinerRef.createEmbeddedView(this.templateRef)
    }else{
      this.viewConatinerRef.clear();
    }
  }

}
