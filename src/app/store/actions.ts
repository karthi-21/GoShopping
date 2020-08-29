import { Action } from '@ngrx/store';
import { Product } from '../model/product';
import { Cart } from '../model/cart';

export enum ActionTypes {
  Add = '[Product] Add to cart',
  Remove = '[Product] Remove from cart',
  Update = '[Product] Update to cart',
  LoadItems = '[Products] Load items from server',
  LoadSuccess = '[Products] Load success'
}

export class AddToCart implements Action {
  readonly type = ActionTypes.Add;

  constructor(public payload: Product) { }
}

export class UpdateToCart implements Action {
  readonly type = ActionTypes.Update;

  constructor(public payload: Product, public quantity: number) { }
}

export class RemoveFromCart implements Action {
  readonly type = ActionTypes.Remove;

  constructor(public payload: Product) { }
}

export class GetItems implements Action {
  readonly type = ActionTypes.LoadItems;
}

export class LoadItems implements Action {
  readonly type = ActionTypes.LoadSuccess;

  constructor(public payload: Product[]) { }
}

export type ActionsUnion = AddToCart | UpdateToCart | RemoveFromCart | LoadItems | GetItems;
