export interface Product {
  id?: string,
  Name: string;
  Description: string;
  TotalProduct: number;
  TotalStock: number;
  TotalService: number;
  Type: string;
  Price: number;
  imagePath: string;
}
export interface Type {
  Type: string;
}