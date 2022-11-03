import { Injectable } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Dta, Order, OrderProduct } from '../models/order/order.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from './cart.service';
import { Cart, CartCostmer } from '../models/cart/cart.module';
import { Product } from '../models/product/product.module';
import { OrderService } from './order.service';
import { AppComponent } from '../app.component';
import { info } from 'console';

@Injectable({
  providedIn: 'root',
})
export class ProcessPaymentService {
  cargaProduct: OrderProduct[] = [];
  user = '' + localStorage.getItem('user');
  cartItems = [];
  totalPrecio = 0;
  Nombre='';
  Municipio='';
  Comunidad='';
  Numero='';
  tel='';
  rangeDates!:Date;
  dias= 0;
  producto = {
    descripcion: 'producto en venta',
    precio: 20.0,
    img: 'imagen de tu producto',
  };
  payPalConfig?: IPayPalConfig;

  constructor(
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private orderService: OrderService,
  ) {}
  setdate(date:Dta){
    this.Nombre = date.Nombre;
    this.Municipio = date.Municipio;
    this.Comunidad = date.Comunidad;
    this.Numero = date.Numero;
    this.tel = date.tel;
    this.rangeDates = date.rangeDates;
    this.dias = Number(date.dias);

  }

  initConfig() {
    this.payPalConfig = {
      currency: 'MXN',
      clientId:
        'AZc9ELb_wCswN4YHPXgb8RQZg25npnaEZkoWa07F-2BlRicxhS9J4FFcHZwS6ywKL5xrJPUXnEuOYNsB',
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'MXN',
                value: this.totalPrecio.toString(), //TOTAAAAL
                breakdown: {
                  item_total: {
                    currency_code: 'MXN',
                    value: this.totalPrecio.toString(), //TOTAAAAL
                  },
                },
              },
              
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get()        
         .then((details:any) => {
          if(details){
            console.log('jnvhfvyfbv')
            const data: Order={
              Status: 'En proseso',
              FullNameUser: this.Nombre,
              Paid: true,
              Municipio: this.Municipio,
              Comunidad: this.Comunidad,
              Numero: this.Numero,
              Email: 'Nombre',
              Telefone: this.tel,
              DateDeliver: new Date(),
              DateReturn: this.rangeDates,
              Products: this.cargaProduct,
              IdCustomer: this.user,
              Dias: this.dias,
              TotalPrecio: this.totalPrecio
            }
            this.orderService.postOrder(data).subscribe((mesaje:any)=>{
              console.log(mesaje)
            })
          }
        console.log('onApprove - you can get full order details inside onApprove: ', details);
         });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          JSON.stringify(data)
        );
        // this.openModal(
        //   data.purchase_units[0].items,
        //   data.purchase_units[0].amount.value
        // );
        // this.emptyCart();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err: any) => {
        console.log('OnError', err);
      },
      onClick: (data: any, actions: any) => {
        console.log('onClick', data, actions);
      },
    };
    return this.payPalConfig;
  }
  // permite cargar y actualisar los productos al camioncito
  cargandoProduct(product: OrderProduct) {
    var elementIndex = this.cargaProduct.findIndex(
      (obj) => obj.IdProducts == product.IdProducts
    );
    console.log(elementIndex);
    if (elementIndex > -1) {
      this.cargaProduct[elementIndex].Amount = product.Amount;
    } else {
      const l = this.cargaProduct.length;
      this.cargaProduct.push(product);
      this.alert('Se agrego correctamente');
    }
  }
  alert(text: string) {
    this.snackBar.open('' + text, '', {
      duration: 3000,
    });
  }
  totalProduct() {
    return this.cargaProduct.length;
  }
  verCargaProduct() {
    return this.cargaProduct;
  }
  setPrecio(precio: number){
    this.totalPrecio = precio;
  }
  verPrecioTotal() {
    this.totalPrecio = 0;
    this.cargaProduct.forEach((mst) => {
      const p = mst.Total;
      this.totalPrecio += p;
    });
    return this.totalPrecio;
  }
  // Recarga el carrito para mostrarselo al usuario
  cargaAnterior() {
    this.cargaProduct = [];
    const l: CartCostmer = {
      IdCustomer: this.user,
    };
    this.cartService.getCart(l).subscribe((cart: any) => {
      if (cart[0] != undefined) {
        localStorage.setItem('idCart', cart[0]._id);
        const products = cart[0].Products;
        let i = 0;
        products.forEach((product: any) => {
          this.cargaProduct.push(product);
        });
      } else {
        localStorage.setItem('idCart', '');
      }
    });
  }
  eliminar(Id: string) {
    const l = '' + localStorage.getItem('idCart');
    if (this.cargaProduct.length > 1) {
      var elementIndex = this.cargaProduct.findIndex(
        (obj) => obj.IdProducts == Id
      );
      this.cargaProduct.splice(elementIndex, 1);
      const cart: Cart = {
        IdCustomer: this.user,
        Products: this.cargaProduct,
      };
      this.cartService.ubdateCart(l, cart).subscribe((mensaje: any) => {});
    } else {
      this.cartService.deleteCart(l).subscribe((mensaje: any) => {});
    }
    this.cargaAnterior();
  }
}
