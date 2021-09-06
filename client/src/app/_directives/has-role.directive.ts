import { Directive, OnInit, TemplateRef, ViewContainerRef,Input } from '@angular/core';
import { IUser } from 'Models/user';
import { take } from 'rxjs/operators';
import { AccountService } from 'services/account.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
 user : IUser;
 @Input() appHasRole:string[];
  constructor(private viewContainerRef : ViewContainerRef, 
    private templateRef:TemplateRef<any>,
    private accountService :AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(res=>{
        this.user = res;
      });
     
     }
  ngOnInit(): void {
    if(!this.user?.roles || this.user == null)
    {
      this.viewContainerRef.clear();
      return;
    }
    if(this.user?.roles.some(r=> this.appHasRole.includes(r)))
    {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }else{
      this.viewContainerRef.clear();
    }
  }

}
