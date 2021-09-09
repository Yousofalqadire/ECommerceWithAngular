import { Component, OnInit, Output } from '@angular/core';
import { Product } from 'Models/product';
import { ProductService } from 'services/product.service';
import { ScriptService } from 'services/script.service';
import {fade} from '../_animations/fadeAnimation'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  animations:[
    fade
  ]
})
export class ShopComponent implements OnInit {
  @Output()  products:Array<Product>;
  totalLingth:number;
  page:number=1;
  constructor(private scripService:ScriptService, private productService:ProductService) { }

  ngOnInit(): void {
   
    this.productService.getProducts().subscribe(response=>{
      this.products = response;
      this.totalLingth = this.products.length;
      
    });
    this.scripService.loadScripFile();
  }

}
