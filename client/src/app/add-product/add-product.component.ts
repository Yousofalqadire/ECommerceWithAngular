import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'services/product.service';
import { ScriptService } from 'services/script.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
 
  addProductForm = new FormGroup({
    Name : new FormControl('',[Validators.required,Validators.minLength(3)]),
    Category: new FormControl('',[Validators.required,Validators.minLength(3)]),
    Brand: new FormControl('',[Validators.required,Validators.minLength(3)]),
    Details: new FormControl('',[Validators.required,Validators.minLength(20)]),
    Price :new FormControl('',Validators.required),
    Photo: new FormControl('',Validators.required),
    Image: new FormControl('', [Validators.required]),
    Sizes: new FormArray([])
    
  });
  constructor(private script:ScriptService,private productService:ProductService,private tostr:ToastrService) { }

  ngOnInit(): void {
    this.script.loadAdminScriptFile();
    this.script.loadScripFile();
  }

  onAddSizes()
  {
    const control = new FormControl('',[Validators.required]);
    (<FormArray>this.addProductForm.get('Sizes')).push(control);
  }

  get formSizes()
  {
     return (<FormArray>this.addProductForm.get('Sizes')).controls;
  }
  // to get reactive form values and initialzed
  get f()
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
   formData.append('Brand',this.addProductForm.get('Brand').value);
   formData.append('Details',this.addProductForm.get('Details').value);
   formData.append('Price',this.addProductForm.get('Price').value);
   formData.append('Name',this.addProductForm.get('Name').value);
   formData.append('Category',this.addProductForm.get('Category').value);
   formData.append('Image',this.addProductForm.get('Image').value);
   formData.append('Sizes',this.addProductForm.get('Sizes').value)
    this.productService.addProduct(formData).subscribe(res=>{
      if(res)
      {
        this.tostr.success('you added new item ');
        console.log(res)
      }

    })
    
   
  }
}
