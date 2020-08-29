import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/model/product';
import { GetItems } from 'src/app/store/actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private store: Store<any>, private spinner: NgxSpinnerService) {
    store.pipe(select('shop')).subscribe((data: any) => (this.products = data.items));
  }

  ngOnInit() {
    this.showSpinner();
    this.store.dispatch(new GetItems());
  }

  showSpinner() {
    if (this.products.length > 0) {
      this.spinner.hide();
    } else {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
    }
  }

}
