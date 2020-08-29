import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { RemoveFromCart } from 'src/app/store/actions';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  cart: Product[] = [];
  total = 0;

  constructor(private store: Store<any>) {
    store.pipe(select('shop')).subscribe((data: any) => (this.cart = data.cart));
  }

  ngOnInit() {
  }

  getTotal() {
    let total = 0;
    this.cart.forEach(item => {
      total += Number(item.price);
    });
    return total;
  }

  removeFromCart(item: Product) {
    this.store.dispatch(new RemoveFromCart(item));
  }

}
