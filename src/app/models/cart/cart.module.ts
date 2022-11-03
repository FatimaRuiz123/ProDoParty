import { OrderProduct } from "../order/order.module";

export interface Cart {
	IdCustomer: string,
	Products:OrderProduct[]
} 
export interface CartCostmer{
	IdCustomer:string,
} 