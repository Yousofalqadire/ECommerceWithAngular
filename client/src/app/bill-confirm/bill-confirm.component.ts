import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddToBill } from 'src/_models/add-to-bill';
import { User } from 'src/_models/user';
import { AddToBillService } from '_services/add-to-bill.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
export interface City{
  name:string
}
@Component({
  selector: 'app-bill-confirm',
  templateUrl: './bill-confirm.component.html',
  styleUrls: ['./bill-confirm.component.css']
})
export class BillConfirmComponent implements OnInit {
  horizintalSnakBarPosition:MatSnackBarHorizontalPosition ="center";
  verticalSnakBarPosition:MatSnackBarVerticalPosition = 'bottom';
  city :City[] = [
    {name:'الرمثا'},
    {name:'اربد'},
    {name:'جرش'},
    {name:'عجلون'},
    {name:'المفرق'},
    {name:'عمان'},
    {name:'السلط'},
    {name:'مادبا'},
    {name:'الكرك'},
    {name:'الطفيلة'},
    {name:'معان'},
    {name:'العقبة'}
    
  ]
  constructor(private addToBill:AddToBillService,
     private fb :FormBuilder,
     private matSnakBar:MatSnackBar) { }

  ngOnInit(): void {
    this.initialAddToBillForm()
  }

  addToBilForm = this.fb.group({
   phone : new FormControl('',[Validators.required, Validators.maxLength(14),Validators.minLength(10)]),
   city: new FormControl('',[Validators.required]),
   street: new FormControl('',[Validators.required]),
   buildNo: new FormControl('')
  });


  initialAddToBillForm()
  {
    return this.addToBilForm.controls;
  }

  saveBill()
  {
    const user:User = JSON.parse(localStorage.getItem('user'));
    const address = 'city :' + this.addToBilForm.get('city').value +'street :' +this.addToBilForm.get('street').value +'build No : ' + this.addToBilForm.get('buildNo').value
    const invoiceDetails :AddToBill={
      UserName:user.userName,
      Phone:this.addToBilForm.get('phone').value,
      Address:address
    }
    this.addToBill.confirmBill(invoiceDetails).subscribe(res=>{
      this.matSnakBar.open(' تم تثبيت عملية الشراء وسوف يتم الشحن عن طريق شركة ارامكس خلال مدة اقصاها ثلاثة أيام','X',{
        horizontalPosition:this.horizintalSnakBarPosition,
        verticalPosition:this.verticalSnakBarPosition
  
      })
    })
  }


}
