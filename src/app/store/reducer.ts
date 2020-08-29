import { ActionsUnion, ActionTypes } from './actions';
import { produce } from 'immer';
import { State } from '../model/state';

export const initialState: State = {
  items: [],
  cart: []
};

export function ShopReducer(state = initialState, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.LoadSuccess:
      return {
        ...state,
        items: [...action.payload]
      };

    case ActionTypes.Add:
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }]
      };

    case ActionTypes.Remove:
      return {
        ...state,
        cart: [...state.cart.filter(item => item.product.id !== action.payload.id)]
      };

    case ActionTypes.Update:
      return {
        ...state,
        cart: produce(state.cart, draftCart => {
          draftCart.map(item => (item.product.id === action.payload.id) ? item.quantity += action.quantity : item.quantity);
        })
      };

    case ActionTypes.Reset:
      return {
        ...state,
        cart: []
      };

    default:
      return state;
  }
}
