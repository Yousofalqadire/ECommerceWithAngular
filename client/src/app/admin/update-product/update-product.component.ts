import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/_models/product';
import { AdminService } from '_services/admin.service';
import { ProductsService } from '_services/products.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
productId:number;
product:Product;
horizintalSnakBarPosition:MatSnackBarHorizontalPosition ="center";
verticalSnakBarPosition:MatSnackBarVerticalPosition = 'bottom';
  constructor(private activateRoute:ActivatedRoute,
              private adminService:AdminService,
              private productService:ProductsService,
              private fb:FormBuilder,
              private matSnackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(res=>{
      this.productId = parseInt(res.get('id'));
    })
    this.productService.getProductById(this.productId).subscribe((product:Product)=>{
      this.product = product;
      this.updateProductForm.patchValue({
       id:product.id,
       name:product.name,
       category:product.category,
       brand:product.brand,
       price:product.price,
       details:product.details,
       photo:product.photo.url,
       sizes:product.sizes
      });
   const sizes= this.updateProductForm.get('sizes') as FormArray;
      product.sizes.forEach(ele=>{
        const size = new FormControl('');
        sizes.push(size);
        size.patchValue(ele.value);
      })

    });
    this.initialForm();
    
  }
 updateProductForm = this.fb.group({
   id:new FormControl(''),
   name: new FormControl(''),
   category: new FormControl(''),
   brand: new FormControl(''),
   price: new FormControl(''),
   details: new FormControl(''),
   photo:new FormControl(''),
   Image: new FormControl(''),
   sizes: new FormArray([])
 });
 initialForm()
 {
   return this.updateProductForm.controls;
 }
 get sizes()
 {
   return (<FormArray> this.updateProductForm.get('sizes')).controls;
 }
 onAddSize()
 {
   (<FormArray> this.updateProductForm.get('sizes')).controls
   .push(new FormControl('',[Validators.required]));
 }
 removeSize(index:number)
 {
   let sizes = this.updateProductForm.get('sizes') as FormArray;
   sizes.removeAt(index);
   return sizes
 }


 onFileChange(event)
 {
    if(event.target.files.length > 0)
    {
      const file =  event.target.files[0];
      this.updateProductForm.patchValue({Image :file});
    }
 }
 updateProduct()
 {
  const formData = new FormData();
  formData.append('Id',this.updateProductForm.get('id').value);
  formData.append('Name',this.updateProductForm.get('name').value);
  formData.append('Category',this.updateProductForm.get('category').value);
  formData.append('Brand',this.updateProductForm.get('brand').value);
  formData.append('Price',this.updateProductForm.get('price').value);
  formData.append('Details',this.updateProductForm.get('details').value);
  formData.append('Image',this.updateProductForm.get('Image').value);
 this.sizes.map((x)=>{
   formData.append('Sizes', x.value)

 })
 this.adminService.updateProduct(formData).subscribe(res=>{
  setTimeout(()=>{
    this.matSnackBar.open(`the product with id : ${res.id} has been updated successfuly`,'X',{
    horizontalPosition:this.horizintalSnakBarPosition,
    verticalPosition:this.verticalSnakBarPosition

  })
  },2000)
 })

 }
}
