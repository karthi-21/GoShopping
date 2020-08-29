import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { RemoveFromCart, UpdateToCart, ResetCart } from 'src/app/store/actions';
import { Cart } from '../../model/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  cart: Cart[] = [];
  total = 0;
  products: Product[] = [];

  constructor(private store: Store<any>, private toastr: ToastrService) {
    store.pipe(select('shop')).subscribe((data: any) => {
      this.cart = data.cart;
      this.products = data.items;
    });
  }

  ngOnInit() {
  }

  getTotal() {
    let total = 0;
    this.cart.forEach((item: Cart) => {
      total += (Number(item.product.price) * Number(item.quantity));
    });
    return total;
  }

  updateToCart(product: Product, quantity: number, itemQuantity: number) {
    if (quantity === 1 && itemQuantity < this.getProductQuantity(product)) {
      this.store.dispatch(new UpdateToCart(product, quantity));
    } else if (quantity === -1) {
      this.store.dispatch(new UpdateToCart(product, quantity));
    } else {
      this.toastr.error('Out of Stock!', 'Sorry, we have only '
        + this.getProductQuantity(product) +
        ' in stock!');
    }
  }

  removeFromCart(item: Product) {
    this.store.dispatch(new RemoveFromCart(item));
  }

  getProductQuantity(product: Product) {
    const productItem = this.products.find((item: Product) => item.id === product.id);
    return productItem !== undefined ? productItem.quantity : 0;
  }

  checkout() {
    this.store.dispatch(new ResetCart());
    this.toastr.success('Order confirmed', 'yay! your order has been placed successfully');
  }
}
