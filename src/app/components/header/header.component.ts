import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  cart: Product[] = [];

  constructor(private store: Store<any>) {
    store.pipe(select('shop')).subscribe((data: any) => (this.cart = data.cart));
  }

  ngOnInit() {
  }

}
