import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RolesComponent } from './roles/roles.component';
import { ShopComponent } from './shop/shop.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import{AuthGuard} from './_guards/auth.guard';
import{AdminGuard} from './_guards/admin.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [

  {path:'home', component:HomePageComponent },
  {path:'',redirectTo:'/home',pathMatch:'full'},
  
  {path:'home',
   children:[
    {path:'login',component:LoginPageComponent},
    {path:'register',component:RegisterPageComponent},
    {path:'itemDetails/:id',component:ItemDetailsComponent},
    {path:'shoppingCart', component:ShoppingCartComponent,canActivate:[AuthGuard]},
    {path:'Cart/:username', component:ShoppingCartComponent,canActivate:[AuthGuard]},
    {path:'shop', component:ShopComponent}

   ]


  },
  {path:'admin',component:AdminComponent,canActivate:[AdminGuard]},
  {path:"admin", 
   children:[
     {path:"roles",component:RolesComponent},
     {path:"addProduct", component:AddProductComponent},
     {path:"productList", component:ProductListComponent}
   ]
  }

  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
