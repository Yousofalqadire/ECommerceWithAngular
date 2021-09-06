import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'Models/cartItem';
import { Product } from 'Models/product';
import { IUser } from 'Models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'services/product.service';
import { ScriptService } from 'services/script.service';
import { ShoppingCartService } from 'services/shopping-cart.service';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  id:any;
product:Product;
quntity:number=1;
size:string;
cartItem:CartItem;
cartItems:Array<CartItem>;

  constructor( private route : ActivatedRoute,
             private productService:ProductService,
             private scriptService:ScriptService,
             private cartService:ShoppingCartService,
             private toastr:ToastrService,
             private router:Router,
             private spinner:NgxSpinnerService) { }

             
  ngOnInit(): void {

     this.route.paramMap.subscribe(response=>
      {
        this.id = response.get('id');       
        this.productService.getProduct(this.id).subscribe(response=>
          {
            this.product = response;
           
          });
      });

      
      this.addToCart();
      this.scriptService.loadScripFile();
  }


  
   addToCart()
  {
    let user :IUser = JSON.parse(localStorage.getItem('user'));
    if(  user == null)
    {
      this.router.navigateByUrl('/home/login');
    }
    let cItem:CartItem =
    {ProductId:this.product.id,ProductName:this.product.name,
      ProductPhoto:this.product.photo.url,
    ProductPric:this.product.price,Quantity:1,SelectedSize:this.size,User:user.userName}
   this.cartService.addProduct(cItem).subscribe(res=>{
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
     this.toastr.success("item added to your cart");
    },3000);
   })
  
  }

}
