export interface Order {
  IdCustomer: string,
  Status: string;
  FullNameUser: string;
  Paid: boolean;
  Municipio: string;
  Comunidad: string;
  Numero: string;
  Email: string;
  Telefone: string;
  DateDeliver: Date;
  DateReturn: Date;
  Dias: Number;
  TotalPrecio: number;
  Products: OrderProduct[];
}
export interface OrderProduct {
  _id?: string;
  IdProducts: string;
  Name: string;
  Description: string;
  Amount: number;
  Total: number;
  UrlImage: string;
}
export interface Dta{
  dias: number;
  Nombre: string;
  Municipio:string;
  Comunidad: string;
  Numero: string;
  tel: string;
  rangeDates: Date;
}
