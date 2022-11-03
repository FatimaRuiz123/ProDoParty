import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesComponent } from './Component/detalles/detalles.component';
import { HomeComponent } from './Component/home/home.component';
import { CartComponent } from './Component/cart/cart.component';
import { LoginComponent } from './Component/login/login.component';
import { SillaComponent } from './Component/silla/silla.component';
import { MesaComponent } from './Component/mesa/mesa.component';
import { InflableComponent } from './Component/inflable/inflable.component';
import { AdornoComponent } from './Component/adorno/adorno.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'details',
    component: DetallesComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sillas',
    component: SillaComponent,
  },
  {
    path: 'mesas',
    component: MesaComponent,
  },
  {
    path: 'inflables',
    component: InflableComponent,
  },
  {
    path: 'adornos',
    component: AdornoComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
