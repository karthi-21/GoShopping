import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/model/product';
import { Store, select } from '@ngrx/store';
import { AddToCart, RemoveFromCart } from '../../store/actions';
import { faCartPlus, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  inCart = false;
  @Input() product: Product;
  cart: Product[];
  faCartPlus = faCartPlus;
  faCartArrowDown = faCartArrowDown;

  constructor(private store: Store<any>, private route: Router) {
    store.pipe(select('shop')).subscribe((data: any) => (this.cart = data.cart));
  }

  ngOnInit() {
    this.checkCart();
  }

  checkCart() {
    const exist = this.cart.find(item => item.id === this.product.id);
    this.inCart = exist ? true : false;
  }

  addToCart(item: Product) {
    this.store.dispatch(new AddToCart(item));
    this.inCart = true;
  }

  removeFromCart(item: Product) {
    this.store.dispatch(new RemoveFromCart(item));
    this.inCart = false;
  }

  openProductDetail() {
    console.log('coming');
    this.route.navigate(['/product-detail']);
  }
}
