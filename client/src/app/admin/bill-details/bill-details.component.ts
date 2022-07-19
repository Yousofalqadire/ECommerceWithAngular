import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '_services/admin.service';
import { Bill } from '../adminModels/bill';
import { BillDetail } from '../adminModels/bill-details';
import { UpdateBill } from '../adminModels/update-bill';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {
  bill:Bill;
billId:number;
updateBill:UpdateBill;
horizintalSnakBarPosition:MatSnackBarHorizontalPosition ="center";
verticalSnakBarPosition:MatSnackBarVerticalPosition = 'bottom';
  constructor(private activateRoute:ActivatedRoute,
              private adminService:AdminService,
              private matSnackBar:MatSnackBar) { }
 billDetails:BillDetail[];
 dataSource;
 displayColumns:string[]=['id','billId','productId','productName',
 'selectedSize','productPrice','quantity','totalPrice']
  ngOnInit(): void {
     this.getBills();
  }

  getBills()
  {
    this.activateRoute.paramMap.subscribe(res=>{
      const billId = parseInt(res.get('id'));
      this.billId = billId;
      this.adminService.getBillById(this.billId).subscribe(res=>{
        this.bill = res;
      });
      this.adminService.getBillDetails(billId).subscribe(res=>{
        this.billDetails = res;
        this.dataSource = new MatTableDataSource<BillDetail>(this.billDetails);
      });
    })
  }

  addToDeliver()
  {
    const deliverd:UpdateBill = {BillId:this.billId, Status:1}
    this.adminService.updateBill(deliverd).subscribe(res=>{
      setTimeout(()=>{
        this.matSnackBar.open('تم اضافة الفاتورة بنجاح','X',{
        horizontalPosition:this.horizintalSnakBarPosition,
        verticalPosition:this.verticalSnakBarPosition
  
      })
      },1000);
      this.getBills();
    });
  }
  addToConfirmed()
  {
    const confirmed:UpdateBill = {BillId:this.billId, Status:2}
    this.adminService.updateBill(confirmed).subscribe(res=>{
      setTimeout(()=>{
        this.matSnackBar.open('تم اضافة الفاتورة بنجاح','X',{
        horizontalPosition:this.horizintalSnakBarPosition,
        verticalPosition:this.verticalSnakBarPosition
  
      })
      },1000);
      this.getBills();
    });
  }
  addToSale()
  {
    const confirmed:UpdateBill = {BillId:this.billId, Status:3}
    this.adminService.addToSale(this.billId).subscribe(res=>{
      setTimeout(()=>{
        this.matSnackBar.open('تم اضافة الفاتورة بنجاح','X',{
        horizontalPosition:this.horizintalSnakBarPosition,
        verticalPosition:this.verticalSnakBarPosition
  
      });
      },1000);
       console.log(res);
    });
    this.adminService.updateBill(confirmed).subscribe(res=>{
      setTimeout(()=>{
        this.matSnackBar.open('تم تعديل حالة الفاتورة بنجاح','X',{
        horizontalPosition:this.horizintalSnakBarPosition,
        verticalPosition:this.verticalSnakBarPosition
  
      })
      },2000);
      this.getBills();
    });
  }

}
