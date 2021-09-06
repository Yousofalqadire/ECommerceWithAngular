import { error } from '@angular/compiler/src/util';
import {  Component, OnInit } from '@angular/core';
import { CartItem } from 'Models/cartItem';
import { IUser } from 'Models/user';
import { ToastrService } from 'ngx-toastr';
import { ScriptService } from 'services/script.service';
import { ShoppingCartService } from 'services/shopping-cart.service';
let user:IUser = JSON.parse(localStorage.getItem('user'));
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit  {

  
  myItems:Array<any>=[];
  cartItem:CartItem;
  total:any=[];
  bill:number;
  itemId:number;
  constructor(private scriptService:ScriptService,
             private shoppingCart:ShoppingCartService,
             private toastr:ToastrService) { }

  ngOnInit(): void {
    
     this.getUserCart();
     this.removeItem(this.itemId)   
     
    //console.log(this.bill);
     this.scriptService.loadScripFile();
  }

 

  getUserCart()
  {
    this.shoppingCart.getUserCart(user.userName).subscribe(response=> 
      {
        this.myItems = response;
        console.log(this.myItems);
        for(let i =0; i<= this.myItems.length;i++)
        {
          const q = this.myItems[i]['quantity'];
          const p = this.myItems[i]['productPric']
          const totalPrice = q*p;
          this.total.push(totalPrice);
          let sum = 0
          for(let n of this.total)
        {
           sum += n;
        }
         this.bill = sum;
        }
        
      });
  }

 removeItem(id:number)
 {
   
   this.itemId= id;
   this.shoppingCart.removeItem(this.itemId).subscribe(response=>{
    let itemid :number = response;
    
    for(let i=0;i<=this.myItems.length;i++)
    {
      if(this.myItems[i].id === itemid)
       this.myItems.splice(i,1);
       return;
    }
     
   })
 }

}
