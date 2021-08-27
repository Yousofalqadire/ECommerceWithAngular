import { Component, OnInit } from '@angular/core';
import { IRegister } from 'Models/IRegister';
import { AccountService } from 'services/account.service';
import { ScriptService } from 'services/script.service';
import{FormsModule} from '@angular/forms'
import { JsonpClientBackend } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $ : any;
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
user: IRegister = {
  Email:'',
  Password:'',
  ConfirmPassword:'',
  Age:0,
  FirstName:'',
  LastName:'',
  City:''
}
userManagerResponce:any;
  constructor(private scriptService: ScriptService,
    private accountService:AccountService , 
    private router : Router) { }

  ngOnInit(): void {
    this.rigester();
   this.scriptService.loadScripFile();
   
  }
rigester(){
  
  this.accountService.register(this.user).subscribe(response=>{
   this.userManagerResponce = response;
   //console.log(this.userManagerResponce);
  })
}

verfiyAccount()
{
   this.router.navigateByUrl('/home/login');
}
}
