import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/login-dialog/login-dialog.component';
import { AdminService } from '_services/admin.service';
import { Sale } from '../adminModels/sale';
import{MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-months-sales-dialog',
  templateUrl: './months-sales-dialog.component.html',
  styleUrls: ['./months-sales-dialog.component.css']
})
export class MonthsSalesDialogComponent implements OnInit {
year:number;
months:number[];
sales:Sale[];
dataSource;
displayColumns=['id','year','month','amount','date'];
@ViewChild(MatPaginator) paginator:MatPaginator
  constructor(private matDilogRef:MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any,private adminService:AdminService) { }

  ngOnInit(): void {
    this.year = this.data.year;
    this.adminService.getMonthByYear(this.year).subscribe(res=>{
     this.months = res;
    })
    
  
  }
  getSalesByMonth(month:number)
  {
    this.adminService.getSalesByMonth(month).subscribe(res=>{
      this.sales = res;
      this.dataSource = new MatTableDataSource<Sale>(this.sales);
      this.dataSource.paginator = this.paginator;
    })
  }
  closeDialog()
  {
    this.matDilogRef.close(this.sales);
  }
}
