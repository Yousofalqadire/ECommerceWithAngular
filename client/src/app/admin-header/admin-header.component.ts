import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'services/script.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private scriptService:ScriptService) { }

  ngOnInit(): void {
    //this.scriptService.loadAdminScriptFile();
  }

}
