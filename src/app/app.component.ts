import {
  Component,
  DoCheck,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MostrarCatalogoService } from './services/mostrar-catalogo.service';
import { Router } from '@angular/router';
import { ProcessPaymentService } from './services/process-payment.service';
import { IPayPalConfig } from 'ngx-paypal';
import { OrderProduct, Dta } from './models/order/order.module';
import { Cart } from './models/cart/cart.module';
import { UpdateCartProductsService } from './services/updateCartProducts.service';
import { SetCartProductsService } from './services/setCartProducts.service';
import { CodigoPostalService } from './services/codigo-postal.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';
import { Comunidad } from './models/comunidad/comunidad.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'DoParty';
  visibleSidebar2 = false;
  loandingCP1 = true;
  loandingCP2 = false;
  nombre = '';
  codigoPostal = '';
  estado = '';
  municipio = '';
  comunidad = '';
  calle = '';
  numero = '';
  tel = '';
  total = 0;
  data: Comunidad[] = [];
  totalPrecio = 0;
  rangeDates!: Date;
  user = '' + localStorage.getItem('user');
  carga: OrderProduct[] = [];
  mostrar = false;
  dias = 1;
  totalObjet = 0;
  @ViewChild('alInputCodigoP') codigoP: ElementRef | undefined;
  public payPalConfig?: IPayPalConfig;
  constructor(
    private mostrarCatalogoService: MostrarCatalogoService,
    private router: Router,
    private updateCartProductsService: UpdateCartProductsService,
    private ProcessPaymentService: ProcessPaymentService,
    private setCartProductsService: SetCartProductsService,
    private codigoPostalService: CodigoPostalService,
    private renderer2: Renderer2,
    private modal: NzModalService
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
    if (this.visibleSidebar2) {
      this.ProcessPaymentService.cargaAnterior();
      this.visibleSidebar2 = false;
    } else {
      this.visibleSidebar2 = true;
      this.ProcessPaymentService.cargaAnterior();
    }

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
    localStorage.setItem('e_mail', '');
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
      this.nombre != '' &&
      this.municipio != '' &&
      this.comunidad != '' &&
      this.calle != '' &&
      this.nombre != '' &&
      this.tel != '' &&
      this.rangeDates != null
    ) {
      const dat: Dta = {
        Nombre: this.nombre,
        Municipio: this.municipio,
        Comunidad: this.comunidad,
        Numero: this.numero,
        tel: this.tel,
        rangeDates: this.rangeDates,
        dias: this.dias,
        calle: this.calle,
      };
      this.ProcessPaymentService.setDate(dat);
    }
  }
  resume() {
    this.totalPrecio = Number(this.totalPrecio) * Number(this.dias);
    this.ProcessPaymentService.setPrecio(this.totalPrecio);
  }
  getCodigoPostal() {
    this.LimpiarDireccio();
    this.data = [];
    var c = this.codigoPostal.toString();
    if (c.length == 5) {
      this.loandingCP1 = false;
      this.loandingCP2 = true;
      this.codigoPostalService
        .getPostal(this.codigoPostal)
        .subscribe((codigoP: any) => {
          if (codigoP.estatus === 'si') {
            this.loandingCP1 = true;
            this.loandingCP2 = false;
            const inputCodigoP = this.codigoP?.nativeElement;
            this.renderer2.setStyle(inputCodigoP, 'border', '0px');

            this.estado = codigoP.data.estado;
            this.municipio = codigoP.data.municipio;
            const d = codigoP.data.asentamientos;
            var i = 0;
            d.forEach((elemnt: any) => {
              const c: Comunidad = {
                nombre: elemnt.nombre,
              };
              this.data[i] = c;
              i++;
            });
          } else {
            this.loandingCP1 = true;
            this.loandingCP2 = false;
            const inputCodigoP = this.codigoP?.nativeElement;
            this.renderer2.setStyle(inputCodigoP, 'border', '2px solid red');
          }
        });
    }else{
      this.LimpiarDireccio();
      const inputCodigoP = this.codigoP?.nativeElement;
      this.renderer2.setStyle(inputCodigoP, 'border', '2px solid red');
    }
    if (c == '') {
      this.LimpiarDireccio();
      const inputCodigoP = this.codigoP?.nativeElement;
      this.renderer2.setStyle(inputCodigoP, 'border', '2px solid red');
    }
  }
  LimpiarDireccio(){
    this.estado = '';
    this.municipio = "";
  }
}
