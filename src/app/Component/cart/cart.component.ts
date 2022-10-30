import { Component, OnInit } from '@angular/core';
import {ProcessPaymentService} from 'src/app/services/process-payment.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private ProcessPaymentService:ProcessPaymentService) { }

  
  public payPalConfig?:IPayPalConfig;
  ngOnInit(): void {
    this.payPalConfig=this.ProcessPaymentService.initConfig();
  }

}
