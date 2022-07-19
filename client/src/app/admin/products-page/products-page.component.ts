import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/_models/product';
import { ProductsService } from '_services/products.service';
import{MatTableDataSource} from '@angular/material/table';
import { AdminService } from '_services/admin.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
products:Product[];
dataSource;
displayColumns:string[] =['productId','productName',
'productPhoto','productPric','productCategory','sizes','update','delete'];
@ViewChild(MatPaginator) paginator:MatPaginator
  constructor(private productService:ProductsService,private adminService:AdminService) { }

  ngOnInit(): void {
    
    this.getItmes()
  }

  getItmes()
  {
    this.productService.getProducts().subscribe(res=>{
      this.products = res;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
    })
  }
  deleteItem(id:number)
  {
    
     this.adminService.deleteItem(id).subscribe(res=>{
       console.log(res);
       this.getItmes();
     })
  }

  applyFilter(filterVal:string)
  {
    this.dataSource.filter = filterVal.trim().toLowerCase()
  }
}
