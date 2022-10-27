import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesComponent } from './Component/detalles/detalles.component';
import { HomeComponent } from './Component/home/home.component';
import { CartComponent} from './Component/cart/cart.component';
import { LoginComponent } from './Component/login/login.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'details',
    component:DetallesComponent
  },
  {
    path: 'cart',
    component:CartComponent
  },
  {
    path: 'login', component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
