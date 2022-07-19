import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { AdminService } from '_services/admin.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private adminService:AdminService,
    private matSnackBar:MatSnackBar) { }
    horizintalSnakBarPosition:MatSnackBarHorizontalPosition ="center";
    verticalSnakBarPosition:MatSnackBarVerticalPosition = 'bottom';

addProductForm = this.fb.group({
  name:new FormControl('',[Validators.required]),
  category:new FormControl('',[Validators.required]),
  brand:new FormControl('',[Validators.required]),
  price:new FormControl('',[Validators.required]),
  details: new FormControl('',[Validators.required]),
  Photo: new FormControl('',Validators.required),
  Image: new FormControl('', [Validators.required]),
  sizes: new FormArray([])
  
  
})

  ngOnInit(): void {
    this.initializeAddProduct();
    
  }
 

  
 get sizes()
  {
    return (<FormArray> this.addProductForm.get('sizes')).controls
  }
  onAddSizes()
  {
       (<FormArray>this.addProductForm.get('sizes'))
       .push( new FormControl('',[Validators.required]));
   
  }
  removeSize(index:number)
  {
    let sizes = this.addProductForm.get('sizes') as FormArray;
    sizes.removeAt(index);
    return sizes
  }
  
  initializeAddProduct()
  {
    return this.addProductForm.controls;
  }
  onFileChange(event)
  {
     if(event.target.files.length > 0)
     {
       const file =  event.target.files[0];
       this.addProductForm.patchValue({Image :file});
     }
  }
   
  addProduct()
  {
    const formData = new FormData();
    formData.append('Name',this.addProductForm.get('name').value);
    formData.append('Category',this.addProductForm.get('category').value);
    formData.append('Brand',this.addProductForm.get('brand').value);
    formData.append('Price',this.addProductForm.get('price').value);
    formData.append('Details',this.addProductForm.get('details').value);
    formData.append('Image',this.addProductForm.get('Image').value);
   let sizes =[];
   this.sizes.map((x)=>{
     formData.append('Sizes', x.value)

   })

   //console.log(formData.get('Sizes'))
     this.adminService.addProduct(formData).subscribe(res=>{
      setTimeout(()=>{
        this.matSnackBar.open('تم اضافة المنتج بنجاح','X',{
        horizontalPosition:this.horizintalSnakBarPosition,
        verticalPosition:this.verticalSnakBarPosition
  
      })
      },2000)
    }) 
  }
}
