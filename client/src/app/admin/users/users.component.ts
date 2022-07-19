import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '_services/admin.service';
import {Member} from '../../../_models/members'
import{MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'
import { Pagination } from 'src/_models/pagination';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { PresenceService } from '_services/presence.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
members :Member[];
pagination:Pagination;
pageNumber:number=1;
pageSize:number=5 ;
dataSource;
displayColumns:string[] =['firstName','lastName','userId','email','userName','birthDay','city','status']
  constructor(private adminService:AdminService,public presenceService:PresenceService) { }

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers()
  {
    this.adminService.getUsers(this.pageNumber,this.pageSize).subscribe(res=>{
      this.members = res.result;
      this.pagination = res.Pagination;
      this.dataSource = new MatTableDataSource<Member>(this.members);     
       this.dataSource.paginator = this.paginator;

    })
  }
  @ViewChild(MatPaginator) paginator:MatPaginator

  applyFilter(filterVal:Event)
  {
    let e = (filterVal.target as HTMLInputElement).value;
    this.dataSource.filter = e.trim().toLowerCase()
  }
  pageChanged(event:PageChangedEvent)
  {
    this.pageNumber = event.page;
    this.loadMembers();
  }
}
