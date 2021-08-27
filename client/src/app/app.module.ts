import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import{ AccountService } from "services/account.service";
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import{ ScriptService } from '../../services/script.service';
import {ProductService} from '../../services/product.service'
import{HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemBoxComponent } from './item-box/item-box.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ToastrModule } from 'ngx-toastr';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {AdminService} from '../../services/admin.service'
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShopComponent } from './shop/shop.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponent } from './admin/admin.component';
import { RolesComponent } from './roles/roles.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSideBarComponent } from './admin-side-bar/admin-side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    ItemBoxComponent,
    ItemDetailsComponent,
    ShoppingCartComponent,
    ShopComponent,
    AdminComponent,
    RolesComponent,
    AddProductComponent,
    AdminHeaderComponent,
    AdminSideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    NgxPaginationModule
     
  ],
  providers: [
    AccountService,
    ScriptService,
    ProductService,
    ShoppingCartService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
