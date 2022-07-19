import { Component, OnInit } from '@angular/core';
import { Product } from 'src/_models/product';
import { CuroselService } from '_services/curosel.service';
import { ProductsService } from '_services/products.service';
import { Curosel } from '../admin/adminModels/curosel';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  products:Product[];
  curosel:Array<Curosel>;
  constructor(private productService:ProductsService,private curoselService:CuroselService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res=>{
      this.products = res
    });
    this.curoselService.getCurosel().subscribe(res=>
      {
        this.curosel = res;
        console.log(res)
      })
  }

}
