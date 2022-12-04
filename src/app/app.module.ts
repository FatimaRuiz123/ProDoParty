import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CalendarModule } from 'primeng/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NgxPayPalModule } from 'ngx-paypal';
import {MatBadgeModule} from '@angular/material/badge';
import { SidebarModule } from 'primeng/sidebar';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home/home.component';
import { CartComponent } from './Component/cart/cart.component';
import { DetallesComponent } from './Component/detalles/detalles.component';
import { LoginComponent } from './Component/login/login.component';
import { FormsModule } from '@angular/forms';
import { SillaComponent } from './Component/silla/silla.component';
import { MesaComponent } from './Component/mesa/mesa.component';
import { AdornoComponent } from './Component/adorno/adorno.component';
import { InflableComponent } from './Component/inflable/inflable.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    DetallesComponent,
    LoginComponent,
    SillaComponent,
    MesaComponent,
    AdornoComponent,
    InflableComponent,
  ],
  imports: [
    BrowserModule,
    NzDatePickerModule,
    NzModalModule,
    NzDrawerModule,
    NzSpinModule,
    SidebarModule,
    AppRoutingModule,
    NzCalendarModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    CalendarModule,
    NzBadgeModule,
    NgxPayPalModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
