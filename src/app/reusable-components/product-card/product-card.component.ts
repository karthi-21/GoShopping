import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/model/product';
import { Store, select } from '@ngrx/store';
import { AddToCart, RemoveFromCart, UpdateToCart } from '../../store/actions';
import { faCartPlus, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Cart } from '../../model/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  inCart = false;
  @Input() product: Product;
  quantity = 0;
  cart: Cart[];
  faCartPlus = faCartPlus;
  faCartArrowDown = faCartArrowDown;
  disableAdd = false;

  constructor(private store: Store<any>, private route: Router, private toastr: ToastrService) {
    store.pipe(select('shop')).subscribe((data: any) => (this.cart = data.cart));
  }

  ngOnInit() {
    this.checkCart();
    this.quantity = Number(this.product.quantity);
  }

  checkCart() {
    const exist = this.cart.find((item: Cart) => item.product.id === this.product.id);
    this.inCart = exist ? true : false;
  }

  getProductQuantity() {
    const cartItem = this.cart.find((item: Cart) => item.product.id === this.product.id);
    return cartItem !== undefined ? cartItem.quantity : 0;
  }

  addToCart() {
    this.quantity--;
    if (Number(this.product.quantity) > 0) {
      this.store.dispatch(new AddToCart(this.product));
    }
  }

  removeFromCart() {
    this.store.dispatch(new RemoveFromCart(this.product));
  }

  updateToCart(quantity: number) {
    if (this.getProductQuantity() < Number(this.product.quantity)) {
      this.quantity = quantity === 1 ? this.quantity - 1 : this.quantity + 1;
      this.store.dispatch(new UpdateToCart(this.product, quantity));
    } else {
      this.disableAdd = true;
      this.toastr.error('Out of stock!', 'Sorry, we have only ' + this.product.quantity + ' in stock');
    }
  }

  openProductDetail() {
    this.route.navigate(['/product-detail']);
  }
}
