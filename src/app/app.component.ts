import { Component, DoCheck, OnInit } from '@angular/core';
import { MostrarCatalogoService } from './services/mostrar-catalogo.service';
import { nav } from './models/model-nav/model-nav.module';
import { Router } from '@angular/router';
import { ProcessPaymentService } from './services/process-payment.service';
import { IPayPalConfig } from 'ngx-paypal';
import { OrderProduct, Dta } from './models/order/order.module';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart/cart.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'DoParty';
  Nombre='';
  Municipio='';
  Comunidad='';
  Numero='';
  tel='';
  total = 0;
  totalPrecio = 0;
  rangeDates!: Date;
  user = '' + localStorage.getItem('user');
  carga: OrderProduct[] = [];
  mostrar = false;
  dias = 0;
  totalObjet = 0;
  public payPalConfig?: IPayPalConfig;
  constructor(
    private mostrarCatalogoService: MostrarCatalogoService,
    private router: Router,
    private processPaymentService: ProcessPaymentService,
    private ProcessPaymentService: ProcessPaymentService,
    private cartService: CartService
  ) {}
  ngDoCheck() {
    this.mostrar = this.mostrarCatalogoService.estadoButton();
    this.total = this.processPaymentService.totalProduct();
    this.carga = this.processPaymentService.verCargaProduct();
    this.totalPrecio = this.processPaymentService.verPrecioTotal();
    this.totalObjet = this.processPaymentService.totalProduct();
  }

  ngOnInit() {
    if (localStorage.getItem('user') === '') {
    }
    this.payPalConfig = this.ProcessPaymentService.initConfig();
    this.processPaymentService.cargaAnterior();
    this.mostrarCatalogoService.Mostrab(false)
  }
  mostrarCatalogo() {
    
    this.router.navigateByUrl('/home');
  }
  mostrarSillas() {
    
    this.router.navigateByUrl('/sillas');
  }
  mostrarMesas() {
    this.router.navigateByUrl('/mesas');
  }
  mostrarInflables() {
    
    this.router.navigateByUrl('/inflables');
  }
  mostrarAdornos() {
    
    this.router.navigateByUrl('/adornos');
  }
  mostrarCarrito() {
   
    // Se agrega o se actualiza el carrito en la base de datos
    const l = ''+localStorage.getItem('idCart');
    if (l != '') {
      const cart: Cart = {
        IdCustomer: this.user,
        Products: this.carga,
      };
      console.log(this.carga)
       if (this.totalObjet >=1){
         this.cartService.ubdateCart(l, cart).subscribe((mensaje: any) => {});
       }
      
    } else {
      const cart: Cart = {
        IdCustomer: this.user,
        Products: this.carga,
      };
      this.cartService.postCart(cart).subscribe((mensaje: any) => {
        if (mensaje != '') {
          this.processPaymentService.cargaAnterior();
        }
      });
    }
  }
  salir() {
    localStorage.setItem('user', '');
    this.router.navigateByUrl('/login');
  }
  eliminar(id: string) {
    this.ProcessPaymentService.eliminar(id);
  }
  detalle(idPoduct: string){
    localStorage.setItem('idProduct', idPoduct);
    this.router.navigateByUrl('/details')
  }
  localst(){
    if(this.Nombre != '' && this.Municipio != '' && this.Comunidad != '' && this.Nombre != '' && this.tel != '' && this.rangeDates != null){
      const dat :Dta ={
        Nombre: this.Nombre,
        Municipio: this.Municipio,
        Comunidad: this.Comunidad,
        Numero: this.Numero,
        tel: this.tel,
        rangeDates: this.rangeDates,
        dias: this.dias
      }
      localStorage.setItem('data', JSON.stringify(dat))
      this.processPaymentService.setdate(dat)
    }
    
  }
  resume(){
    this.totalPrecio = Number(this.totalPrecio)*Number(this.dias);
    this.ProcessPaymentService.setPrecio(this.totalPrecio);
  }
}
