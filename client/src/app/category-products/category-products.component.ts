import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/_models/product';
import {ProductsService} from '../../../_services/products.service'

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
 category:string;
 products:Product[];
 page:number;
totalLingth:number;
  constructor(private router:ActivatedRoute,private productService:ProductsService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(res=>{
      this.category = res.get('category');
      this.productService.getProductByCategory(this.category).subscribe(res=>{
        this.products = res;
        this.totalLingth = this.products.length
      })
    })
  }

}
