import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '_services/admin.service';
import { Bill } from '../adminModels/bill';
import{MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

 bills : Array<Bill>;
 dataSource;
 displayColumns=['id','userName','date','phone','address','show'];
 @ViewChild(MatPaginator) paginator:MatPaginator
  constructor( private adminService:AdminService) { }
  

  ngOnInit(): void {
    this.adminService.getBills().subscribe(res=>{
      this.bills = res;
      this.dataSource = new MatTableDataSource<Bill>(this.bills);
      this.dataSource.paginator = this.paginator;

    }) 
   }

 
}
