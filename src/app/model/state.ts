import { Product } from './product';
import { Cart } from './cart';

export interface State {
  items: Product[];
  cart: Cart[];
}
