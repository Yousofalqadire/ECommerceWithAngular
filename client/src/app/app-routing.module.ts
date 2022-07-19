import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { DashBoardLandingComponent } from './admin/dash-board-landing/dash-board-landing.component';
import { DashBordComponent } from './admin/dash-bord/dash-bord.component';
import { ProductsPageComponent } from './admin/products-page/products-page.component';
import { UsersComponent } from './admin/users/users.component';
import { BillConfirmComponent } from './bill-confirm/bill-confirm.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemsComponent } from './items/items.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './register/register.component';
import { ShippingCartComponent } from './shipping-cart/shipping-cart.component';
import {AuthGuardGuard} from '../app/_guards/auth-guard.guard'
import { ErrorPageComponent } from './error-page/error-page.component';
import {AdminGuard} from './_guards/admin.guard'
import { BillsComponent } from './admin/bills/bills.component';
import { BillDetailsComponent } from './admin/bill-details/bill-details.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { RolesComponent } from './admin/roles/roles.component';
import { AddUsersToRoleComponent } from './admin/add-users-to-role/add-users-to-role.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { AddCuroselItemComponent } from './admin/add-curosel-item/add-curosel-item.component';
import { CallUsComponent } from './call-us/call-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordTemplateComponent } from './update-password-template/update-password-template.component';



const routes: Routes = [
  {path:'admin',component:DashBordComponent,children:[
    {path:'home',component:DashBoardLandingComponent},
    {path:'products',component:ProductsPageComponent},
    {path:'add-product',component:AddProductComponent},
    {path:'app-users',component:UsersComponent},
    {path:'bills',component:BillsComponent},
    {path:'bill-details/:id',component:BillDetailsComponent},
    {path:'update-item/:id',component:UpdateProductComponent},
    {path:'add-users-toRole/:id',component:AddUsersToRoleComponent},
    {path:'roles',component:RolesComponent},
    {path:'curosel',component:AddCuroselItemComponent},
    {path:'',redirectTo:'/admin/home',pathMatch:'full'}
  ],canActivate:[AuthGuardGuard,AdminGuard]},
  {path:'',redirectTo:'/home/landing-page',pathMatch:'full'} ,
  {path:'home',component:HomePageComponent,children:[   
    { path:'landing-page',component:LandingPageComponent},
    {path:'reset-password',component:ResetPasswordComponent},
    {path:'updatePassword',component:UpdatePasswordTemplateComponent},
    {path:'call-us',component:CallUsComponent},
    {path:'about-us',component:AboutUsComponent},
    {path:'services',component:OurServicesComponent},
    {path:'register',component:RegisterComponent},
    {path:'shop',component:ItemsComponent},
    {path:'item-details/:id', component:ItemDetailsComponent},
    {path:'category-products/:category',component:CategoryProductsComponent},
    {path:'error-page',component:ErrorPageComponent},
    {path:'shopping-cart/:username',component:ShippingCartComponent,canActivate:[AuthGuardGuard]},
    {path:'bill-confirm',component:BillConfirmComponent,canActivate:[AuthGuardGuard]} 
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
