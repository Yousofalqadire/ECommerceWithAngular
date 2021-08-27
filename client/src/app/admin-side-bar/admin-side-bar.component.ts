import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'services/script.service';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})
export class AdminSideBarComponent implements OnInit {

  constructor(private scriptService:ScriptService) { }

  ngOnInit(): void {
    //this.scriptService.loadAdminScriptFile();
  }

}
