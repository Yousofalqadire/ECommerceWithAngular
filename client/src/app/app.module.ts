import { BrowserModule } from '@angular/platform-browser'; 
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccountService} from '../../_services/account.service';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {LayoutModule} from '@angular/cdk/layout';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ProductsService} from '../../_services/products.service';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'
import { DatePipe } from '@angular/common';
import {LoderInterceptor} from '../_interceptors/loder.interceptor';
import { ItemsComponent } from './items/items.component';
import {MatRippleModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ItemDetailsComponent } from './item-details/item-details.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {AddToCartService} from '../../_services/add-to-cart.service';
import { ShippingCartComponent } from './shipping-cart/shipping-cart.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ShoppingCartService} from '../../_services/shopping-cart.service';
import { LandingPageComponent } from './landing-page/landing-page.component' ;
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { BillConfirmComponent } from './bill-confirm/bill-confirm.component';
import {AddToBillService} from '../../_services/add-to-bill.service';
import { DashBordComponent } from './admin/dash-bord/dash-bord.component';
import { DashBoardLandingComponent } from './admin/dash-board-landing/dash-board-landing.component';
import { ProductsPageComponent } from './admin/products-page/products-page.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { UsersComponent } from './admin/users/users.component';
import {AdminService} from '../../_services/admin.service';
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import { ErrorPageComponent } from './error-page/error-page.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';
import { BillsComponent } from './admin/bills/bills.component';
import { BillDetailsComponent } from './admin/bill-details/bill-details.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { RolesComponent } from './admin/roles/roles.component';
import { AddUsersToRoleComponent } from './admin/add-users-to-role/add-users-to-role.component';
import { AddRoleDialogComponent } from './admin/add-role-dialog/add-role-dialog.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import{CuroselService} from '../../_services/curosel.service';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { MonthsSalesDialogComponent } from './admin/months-sales-dialog/months-sales-dialog.component';
import { AddCuroselItemComponent } from './admin/add-curosel-item/add-curosel-item.component';
import { HasRolesDirective } from './_directives/has-roles.directive';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { CallUsComponent } from './call-us/call-us.component';
import{PresenceService} from '../../_services/presence.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordTemplateComponent } from './update-password-template/update-password-template.component';



@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        FooterComponent,
        RegisterComponent,
        LoginDialogComponent,
        ItemsComponent,
        ItemDetailsComponent,
        ShippingCartComponent,
        LandingPageComponent,
        BillConfirmComponent,
        DashBordComponent,
        DashBoardLandingComponent,
        ProductsPageComponent,
        AddProductComponent,
        UsersComponent,
        ErrorPageComponent,
        BillsComponent,
        BillDetailsComponent,
        UpdateProductComponent,
        RolesComponent,
        AddUsersToRoleComponent,
        AddRoleDialogComponent,
        CategoryProductsComponent,
        MonthsSalesDialogComponent,
        AddCuroselItemComponent,
        HasRolesDirective,
        AboutUsComponent,
        OurServicesComponent,
        CallUsComponent,
        ResetPasswordComponent,
        UpdatePasswordTemplateComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatGridListModule,
        MatTabsModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatMenuModule,
        MatDialogModule,
        MatCardModule,
        LayoutModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatInputModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRippleModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatCheckboxModule,
        MatListModule,
        NgxPaginationModule,
        MatTableModule,
        IvyCarouselModule,
        NgxMatFileInputModule,
        MatPaginatorModule,
        MatBadgeModule,
        PaginationModule.forRoot(),
        FormsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        AdminService,
        AccountService,
        ProductsService,
        DatePipe,
        AddToCartService,
        ShoppingCartService,
        AddToBillService,
        CuroselService,
        PresenceService,
        { provide: HTTP_INTERCEPTORS, useClass: LoderInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
