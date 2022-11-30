import { Component, DoCheck, OnInit } from '@angular/core';
import { MostrarCatalogoService } from './services/mostrar-catalogo.service';
import { Router } from '@angular/router';
import { ProcessPaymentService } from './services/process-payment.service';
import { IPayPalConfig } from 'ngx-paypal';
import { OrderProduct, Dta } from './models/order/order.module';
import { Cart } from './models/cart/cart.module';
import { UpdateCartProductsService } from './services/updateCartProducts.service';
import { SetCartProductsService } from './services/setCartProducts.service';
import { CodigoPostalService } from './services/codigo-postal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'DoParty';
  Nombre = '';
  codigoPostal = '';
  Municipio = '';
  Comunidad = '';
  Numero = '';
  tel = '';
  total = 0;
  totalPrecio = 0;
  rangeDates!: Date;
  user = '' + localStorage.getItem('user');
  carga: OrderProduct[] = [];
  mostrar = false;
  dias = 1;
  totalObjet = 0;
  public payPalConfig?: IPayPalConfig;
  constructor(
    private mostrarCatalogoService: MostrarCatalogoService,
    private router: Router,
    private updateCartProductsService: UpdateCartProductsService,
    private ProcessPaymentService: ProcessPaymentService,
    private setCartProductsService: SetCartProductsService,
    private codigoPostalService: CodigoPostalService
  ) {}
  ngDoCheck() {
    this.mostrar = this.mostrarCatalogoService.estadoButton();
    this.total = this.ProcessPaymentService.totalProduct();
    this.carga = this.ProcessPaymentService.verCargaProduct();
    this.totalPrecio = this.ProcessPaymentService.verPrecioTotal();
    this.totalObjet = this.ProcessPaymentService.totalProduct();
  }

  ngOnInit() {
    this.mostrarCatalogoService.Mostrab(false);
    if (localStorage.getItem('user') === '') {
    }
    this.payPalConfig = this.ProcessPaymentService.initConfig();
    this.ProcessPaymentService.cargaAnterior();
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
    const l = '' + localStorage.getItem('idCart');
    if (l != '') {
      const cart: Cart = {
        IdCustomer: this.user,
        Products: this.carga,
      };
      if (this.totalObjet >= 1) {
        this.updateCartProductsService
          .ubdateCart(l, cart)
          .subscribe((mensaje: any) => {});
      }
    } else {
      const cart: Cart = {
        IdCustomer: this.user,
        Products: this.carga,
      };
      this.setCartProductsService.postCart(cart).subscribe((mensaje: any) => {
        if (mensaje != '') {
          this.ProcessPaymentService.cargaAnterior();
        }
      });
    }
  }
  salir() {
    localStorage.setItem('user', '');
    this.router.navigateByUrl('/login');
  }
  eliminar(id: string) {
    this.ProcessPaymentService.eliminarProduct(id);
  }
  detalle(idPoduct: string) {
    localStorage.setItem('idProduct', idPoduct);
    this.router.navigateByUrl('/details');
  }
  localst() {
    if (
      this.Nombre != '' &&
      this.Municipio != '' &&
      this.Comunidad != '' &&
      this.Nombre != '' &&
      this.tel != '' &&
      this.rangeDates != null
    ) {
      const dat: Dta = {
        Nombre: this.Nombre,
        Municipio: this.Municipio,
        Comunidad: this.Comunidad,
        Numero: this.Numero,
        tel: this.tel,
        rangeDates: this.rangeDates,
        dias: this.dias,
      };
      localStorage.setItem('data', JSON.stringify(dat));
      this.ProcessPaymentService.setDate(dat);
    }
  }
  resume() {
    this.totalPrecio = Number(this.totalPrecio) * Number(this.dias);
    this.ProcessPaymentService.setPrecio(this.totalPrecio);
  }
  getCodigoPostal() {
    var c = this.codigoPostal.toString();
    if (c.length == 5) {
      this.codigoPostalService
        .getPostal(this.codigoPostal)
        .subscribe((codigoP: any) => {
          if (codigoP.estatus === 'si'){
            console.log(codigoP.estatus);
          }
          
        });
    }
  }
}
