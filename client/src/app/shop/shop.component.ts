import { Component, OnInit, Output } from '@angular/core';
import { Product } from 'Models/product';
import { ProductService } from 'services/product.service';
import { ScriptService } from 'services/script.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
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
      console.log(this.totalLingth);
    });
    this.scripService.loadScripFile();
  }

}
