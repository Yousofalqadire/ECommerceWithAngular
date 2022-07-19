import { Component, OnInit } from '@angular/core';
import { Product } from 'src/_models/product';
import { ProductsService } from '_services/products.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
products:Array<Product>;

page:number;
totalLingth:number;


// ripple 
radius: number;
color: string;
backgroundImg :string;
  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts();
    

  }


  getAllProducts()
  {
    this.productService.getProducts().subscribe(res=>{
      this.products = res;
      this.totalLingth = this.products.length
    }
      
    )
  }


  
}
