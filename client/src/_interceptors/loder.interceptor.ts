import { Injectable } from '@angular/core';

import {  tap } from 'rxjs/operators';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../../_services/loader.service';

@Injectable()
export class LoderInterceptor implements HttpInterceptor {

  constructor(private loaderService:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(request).pipe(
      tap((event:HttpEvent<any>)=>{
        if(event  instanceof HttpResponse)
        {
          this.loaderService.hide();
        }
      },(error)=> {this.loaderService.hide()})
    )
  }
}
