import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AdminService } from '_services/admin.service';
import { Bill } from '../adminModels/bill';

@Component({
  selector: 'app-dash-bord',
  templateUrl: './dash-bord.component.html',
  styleUrls: ['./dash-bord.component.css']
})
export class DashBordComponent implements OnInit {
length:number;
  constructor( private fb:FormBuilder,private adminService:AdminService) { }
 bills:Array<Bill>;
  ngOnInit(): void {
    this.adminService.getBills().subscribe(res=>{
      this.bills = res;
      this.length = this.bills.length;
      
    })
  }

  searchForm = this.fb.group({
    search : new FormControl('')
  })

}
