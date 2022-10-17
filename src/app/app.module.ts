import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home/home.component';
import { CartComponent } from './Component/cart/cart.component';
import { DetallesComponent } from './Component/detalles/detalles.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    DetallesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
