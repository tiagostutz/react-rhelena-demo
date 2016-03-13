import { RhelenaPresentationModel } from 'rhelena'

import Cart from '../domain/Cart.js'

import CartEvents from '../events/CartEvents'

export default class CartModel extends RhelenaPresentationModel{


    constructor() {
        super();
    }

    onCheckoutClicked() {
        Cart.checkout();
    }
}
