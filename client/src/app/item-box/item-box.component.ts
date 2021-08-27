import { Component, OnInit } from '@angular/core';
import { Product } from 'Models/product';
import { ProductService } from 'services/product.service';
import{ScriptService} from 'services/script.service'

@Component({
  selector: 'app-item-box',
  templateUrl: './item-box.component.html',
  styleUrls: ['./item-box.component.css']
})
export class ItemBoxComponent implements OnInit {
  products:Array<Product>;
  constructor(private productService:ProductService, private scriptService:ScriptService) { }

  ngOnInit(): void {
    
  this.getProducts();
  this.scriptService.loadScripFile();

  }

  getProducts()
  {
    this.productService.getProducts().subscribe(respnse=>
      {
         this.products = respnse;
      })
  }
}
