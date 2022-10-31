import { Component,OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.module';
import { ProductsService } from 'src/app/services/products.service';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})
export class DetallesComponent implements OnInit{
  name = 0;
  url = 'http://localhost:4400/';
  product : Product | undefined
  value: any;
  constructor(private productsService: ProductsService) {
    
  }

  ngOnInit(){
    this.getProductId();
  }
  getProductId(){
    const idProduct = localStorage.getItem('idProduct');
    this.productsService.getProductId(""+idProduct).subscribe((products:any) => {
      const l=products.product;
      const product : Product={
        Name: l.Name,
        Description: l.Description,
        TotalProduct: l.TotalProduct,
        TotalStock: l.TotalStock,
        TotalService: l.TotalService,
        Type: l.Type,
        Price: l.Price,
        imagePath: this.url+l.imagePath
      }
      
      this.product= product;
      console.log(this.product);
    })
  }
  mas(){
    this.name +=1;
  }
  menos(){
    if(this.name >=1){
      this.name -=1;
    }
  }
  selectChange(select: Date): void {
    console.log(`Select value: ${select}`);
  }
}
