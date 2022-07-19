import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
public visibility:BehaviorSubject<boolean>;
  constructor() { 
    this.visibility = new BehaviorSubject<boolean>(false)
  }

  show()
  {
    this.visibility.next(true)
  }
  hide()
  {
    setTimeout(()=>{
      this.visibility.next(false)
    }, 5000)
  }
}
