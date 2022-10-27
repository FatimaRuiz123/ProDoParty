import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home/home.component';
import { CartComponent } from './Component/cart/cart.component';
import { DetallesComponent } from './Component/detalles/detalles.component';
import { LoginComponent } from './Component/login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    DetallesComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzCalendarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent ],
})
export class AppModule {}
