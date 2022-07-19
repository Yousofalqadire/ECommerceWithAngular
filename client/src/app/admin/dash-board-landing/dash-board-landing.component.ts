import { Component, OnInit } from '@angular/core';
import { AdminService } from '_services/admin.service';
import {MatDialog} from '@angular/material/dialog';
import { MonthsSalesDialogComponent } from '../months-sales-dialog/months-sales-dialog.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dash-board-landing',
  templateUrl: './dash-board-landing.component.html',
  styleUrls: ['./dash-board-landing.component.css']
})
export class DashBoardLandingComponent implements OnInit {
salesByYears:number[];
centerd:boolean = true;
color:string = "coral";
  constructor(private adminService:AdminService,public dialog: MatDialog,private fb:FormBuilder) { }
 
  ngOnInit(): void {
    this.adminService.getSalesYears().subscribe(res=>{
      this.salesByYears = res;
    })
  }
 
  openDialog(year:number) {
    let dialog=this.dialog.open(MonthsSalesDialogComponent, {
      width: '600px',
      height: '400px',
      data: {
        year:year
      }
    });
  }

}
