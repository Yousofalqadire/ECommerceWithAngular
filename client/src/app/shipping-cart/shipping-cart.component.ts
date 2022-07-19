import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from 'src/_models/shoppingCart';
import { ShoppingCartService } from '_services/shopping-cart.service';
import{MatTableDataSource} from '@angular/material/table';
import{MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition} 
  from '@angular/material/snack-bar'

@Component({
  selector: 'app-shipping-cart',
  templateUrl: './shipping-cart.component.html',
  styleUrls: ['./shipping-cart.component.css']
})
export class ShippingCartComponent implements OnInit {
cartItems; // for tableDataSource the initializtion in the fetch data getCartitem()
cartItemArray:Array<ShoppingCart>; // to update the data in table : removes row from the dom
username:string;
displayColumns:string[] =['id','productId','productName',
'productPhoto','selectedSize','quantity','productPric','totalPrice','delete'];
totalAmount:number =0;
snackBarHorizontalPosition:MatSnackBarHorizontalPosition='center';
snckBarVericalPosition:MatSnackBarVerticalPosition='bottom';

  constructor(private shoppingCartService:ShoppingCartService,
              private router:ActivatedRoute,
              private matSnackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(res=>{
      this.username = res.get('username');
      this.getCartItem();
    })
  }

getCartItem()
{
  this.shoppingCartService.getUserCart(this.username).subscribe(res=>{
    this.cartItemArray = res;
    this.cartItems= new MatTableDataSource<ShoppingCart>(this.cartItemArray);
    for(let i=0; i <this.cartItemArray.length;i++)
    {
      this.totalAmount += this.cartItemArray[i].totalPrice;
    }
  })
}
 
removeItem(id:number)
{
  
  this.shoppingCartService.deleteItem(id).subscribe(res=>{
    const productId:number = res;
     this.cartItemArray.forEach((value,index)=>{
       if(value.id == productId)
       this.cartItemArray.slice(index,1);
       this.totalAmount -= value.totalPrice;      
     })
     this.getCartItem();
     this.matSnackBar.open('تمت ازالة المنتج من السلة','X',{
       horizontalPosition :this.snackBarHorizontalPosition,
       verticalPosition:this.snckBarVericalPosition,     
     })
     
  })
}



}
