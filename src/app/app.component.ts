import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface Product {
  id:number,
  name:string,
  price:number,
  quantity:number
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'signal-demo';

  products = signal<Product[]>
    ([{id:1,name:'iphone 15',price:100,quantity:1},
    {id:2,name:'iphone 14',price:200,quantity:1},
    {id:3,name:'iphone 13',price:300,quantity:1}])

  quantity = signal<number>(1);
  qtyAvailable = signal<number[]>([1, 2, 3, 4, 5, 6]);
  
  subTotal = computed(() => 
    this.products().reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0)
  );

  totalDiscount = computed(() => {
    const totalQty = this.products().reduce((total, product) => {
      return total + (product.quantity);
    }, 0)

    return totalQty > 6 ? this.subTotal() * 0.3 : this.subTotal() * 0.1;
  })
   
  total = computed(() => {
    return this.subTotal() - this.totalDiscount()
  })
   

  onQuantitySelected(product:Product){
   this.products.update(products => {
    return products.map((p)=> 
      p.id == product.id ? {...p, quantity: product.quantity} : {...p}
    )
   })
  }



}
