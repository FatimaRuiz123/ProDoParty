import { Injectable } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class ProcessPaymentService {

  cartItems = [];
  total = 0;

  payPalConfig?: IPayPalConfig;

  constructor(
    private modalService: NgbModal,
  ) { }

  initConfig() {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: "AZc9ELb_wCswN4YHPXgb8RQZg25npnaEZkoWa07F-2BlRicxhS9J4FFcHZwS6ywKL5xrJPUXnEuOYNsB",
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'MXN',
            value: this.total.toString(),//TOTAAAAL
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: this.total.toString()//TOTAAAAL
              }
            }
          },
          // items: this.getItemsList()
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get()
        // .then(details => {
        //   console.log('onApprove - you can get full order details inside onApprove: ', details);
        // });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point',
          JSON.stringify(data));
        // this.openModal(
        //   data.purchase_units[0].items,
        //   data.purchase_units[0].amount.value
        // );
        // this.emptyCart();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
    return this.payPalConfig;
  }



}
