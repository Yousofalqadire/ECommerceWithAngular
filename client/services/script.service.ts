import { Injectable } from '@angular/core';

declare var $ : any;
@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor() { }

  loadScripFile(){
    

      let body=<HTMLDivElement> document.body;
      let script = document.createElement('script');
      script.src = '../assets/js/script.js';
      script.async=true;
      script.defer=true;
      body.appendChild(script);

       script = document.createElement('script');
      script.src = '../assets/js/slick.js';
      script.async=true;
      script.defer=true;
      body.appendChild(script);

     
    
  }

  loadAdminScriptFile()
  {
    let body=<HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.src = "../assets/js/admin-script.js";
    script.async=true;
    script.defer=true;
    body.appendChild(script);

  

    script = document.createElement('script');
    script.src = "../assets/js/sidebar-menu.js";
    script.async=true;
    script.defer=true;
    body.appendChild(script);
    script = document.createElement('script');
    script.src = "../assets/js/dashbord/default.js";
    script.async=true;
    script.defer=true;
    body.appendChild(script);

    script = document.createElement('script');
      script.src = '../assets/js/slick.js';
      script.async=true;
      script.defer=true;
      body.appendChild(script);
  }
}
