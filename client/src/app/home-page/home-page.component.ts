import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'Models/product';
import { IUser } from 'Models/user';
import { Observable } from 'rxjs';

import { ProductService } from 'services/product.service';
import { ScriptService } from 'services/script.service';
declare var $ : any;

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  
  constructor(private scriptService : ScriptService,
    private productService:ProductService,
    private router:Router) { }
  
  ngOnInit(): void {
  
   this.getProducts();
   this.setCategory();
   this.getAttribute(this.attr);
   this.scriptService.loadScripFile();
   
  }
  categorys:any=[];
   title = "policy"; // for test binding
   products : Array<Product>;
   product:Product;
   id:any;
   cardProducts :Array<Product>;
   attr : any; // to get element from dom and pass it to get attribute for the product and pass it to id
   getProducts()
   {
     this.productService.getProducts().subscribe(response=> 
      {
        this.products = response;
      });
      
   }

  getAttribute(el:any)
  {
    this.attr= el;
    this.id = this.attr.getAttribute('item-id');
    this.productService.getProduct(this.id).subscribe(response=>
      {
        this.product = response;
        let user:IUser = JSON.parse(localStorage.getItem('user'));
        console.log(this.product);
        
      })
      console.log(this.product);
  }
   

  setCategory()
  {
    this.productService.getCategorys().subscribe(res=>
      {
        this.categorys = res;
        console.log(this.categorys);
      })

  }
   
}
