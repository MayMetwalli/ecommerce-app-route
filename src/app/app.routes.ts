import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { DetailsComponent } from './pages/details/details.component';
import { ForgetPassComponent } from './pages/forget-pass/forget-pass.component';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

export const routes: Routes = [
    {path:'', redirectTo: 'home', pathMatch: 'full'},
    {path:'',component: AuthLayoutComponent, canActivate:[loggedGuard], children:[
        {path: 'login', component:LoginComponent},
        {path: 'register', component:RegisterComponent, title: 'Register'},
        {path: 'reset-password', component:ForgetPassComponent, title: 'Reset Password'},
    ]},
    {path: '', component: MainLayoutComponent, children:[
        {path:'home', loadComponent:()=> import('./pages/home/home.component').then(e=> e.HomeComponent), title: 'Home'}, //, canActivate:[authGuard]
        {path:'cart',loadComponent:()=> import('./pages/cart/cart.component').then(e=> e.CartComponent), title: 'Cart', canActivate:[authGuard]},
        {path:'wishlist', loadComponent:()=> import('./pages/wishlist/wishlist.component').then(e=> e.WishlistComponent), title: 'Wishlist', canActivate:[authGuard]},
        {path:'products', loadComponent:()=> import('./pages/products/products.component').then(e=> e.ProductsComponent), title: 'Products', canActivate:[authGuard]},
        {path:'brands', loadComponent:()=> import('./pages/brands/brands.component').then(e=> e.BrandsComponent), title: 'Brands', canActivate:[authGuard]},
        {path:'categories', loadComponent:()=> import('./pages/categories/categories.component').then(e=> e.CategoriesComponent), title: 'Categories', canActivate:[authGuard]},
        {path:'checkout', loadComponent:()=> import('./pages/checkout/checkout.component').then(e=> e.CheckoutComponent), title: 'Checkout', canActivate:[authGuard]},
        {path:'details/:prodID', loadComponent:()=> import('./pages/details/details.component').then(e=> e.DetailsComponent), title: 'Details', canActivate:[authGuard]}, // "/:" means there's a param to be sent to the route path
        {path:'allorders', loadComponent:()=> import('./pages/allorders/allorders.component').then(e=> e.AllordersComponent), title: 'All Orders', canActivate:[authGuard]},
        {path:'checkout/:id', loadComponent:()=> import('./pages/checkout/checkout.component').then(e=> e.CheckoutComponent), title: 'Checkout', canActivate:[authGuard]},
    ]},
    {path:'**', component: NotfoundComponent},
];
