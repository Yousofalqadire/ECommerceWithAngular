import { Component, OnInit } from '@angular/core';
import { Product } from 'Models/product';
import { ScriptService } from 'services/script.service';
declare var $ : any;
@Component({
  selector: 'footer-c',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  
  constructor(private scriptService: ScriptService) { }

  ngOnInit(): void {
   
   this.scriptService.loadScripFile();
  }

}
