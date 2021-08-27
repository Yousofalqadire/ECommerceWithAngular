import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'services/script.service';

declare var  $ : any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private scriptService: ScriptService){}
  ngAfterViewInit(){
    this.scriptService.loadScripFile();
  }
  ngOnInit(): void {
   this.scriptService.loadScripFile();
  }
  title = 'client';
}
