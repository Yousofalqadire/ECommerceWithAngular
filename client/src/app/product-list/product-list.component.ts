import { Component, OnInit } from '@angular/core';
import { Product } from 'Models/product';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'services/product.service';
import { ScriptService } from 'services/script.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Product[]=[]
  totalLingth:number;
  page:number=1;
  constructor(private scriptService: ScriptService,
    private productService:ProductService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res=>{
      this.products = res;
    })
    this.deleteItem();
    this.scriptService.loadAdminScriptFile();
    
  }

deleteItem(id?:number)
{
  const  _id = id ? id : null;
  this.productService.deleteItem(_id).subscribe(res=>{
   for(let i = 0; i< this.products.length; i++)
   {
     if(this.products[i].id === _id){
      this.products.splice(i,1);
      return;
     }
     
   }
    this.toastr.success('item deleted');
  })
}

}
