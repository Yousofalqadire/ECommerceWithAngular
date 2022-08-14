import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddToCart } from 'src/_models/add-to-cart';
import { Product } from 'src/_models/product';
import { User } from 'src/_models/user';
import { AccountService } from '_services/account.service';
import { AddToCartService } from '_services/add-to-cart.service';
import { LoaderService } from '_services/loader.service';
import { ProductsService } from '_services/products.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  horizintalSnakBarPosition:MatSnackBarHorizontalPosition ="center";
  verticalSnakBarPosition:MatSnackBarVerticalPosition = 'bottom';
itemId :number| any;
item:Product;
chipsColor:string = "warn";
currintMember:User;
selectSizeForm = this.fb.group({
  selectedSize:new FormControl('',[Validators.required])
});

  constructor(private router:ActivatedRoute ,
    private productService:ProductsService,
    private addToCartService:AddToCartService,
    private fb : FormBuilder ,
     public loader :LoaderService,
      public accountService:AccountService,
      private matSnakBar:MatSnackBar) { }

  ngOnInit(): void {
     this.router.paramMap.subscribe(res=>{
       this.itemId = res.get('id');
       this.productService.getProductAndroid(this.itemId).subscribe(res=>{
         this.item= res;
       })  
     })
     this.initialForm();
     this.accountService.currentUser$.subscribe(user=>{
       this.currintMember = user;
     })
  }

initialForm()
{
  return this.selectSizeForm.controls
}

addToCart()
{
  const user:User = JSON.parse(localStorage.getItem('user'));
   const model : AddToCart =
   {
     ProductId : this.item.id,
     ProductName : this.item.name,
     ProductPhoto: this.item.photo.url,
     ProductPric: this.item.price,
     Quantity : 1,
     SelectedSize: this.selectSizeForm.get('selectedSize').value,
     User: user.userName
     
   }
   this.addToCartService.addToCart(model).subscribe(res=>{
    this.matSnakBar.open('تم اضافة المنتج بنجاح','X',{
      horizontalPosition:this.horizintalSnakBarPosition,
      verticalPosition:this.verticalSnakBarPosition

    })
   })
  

} 

}
