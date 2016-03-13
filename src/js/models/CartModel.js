import { RhelenaPresentationModel } from 'rhelena'

import CartEvents from '../events/CartEvents'

export default class CartModel extends RhelenaPresentationModel{


    constructor() {
        super();
    }

    onCheckoutClicked() {
        this.cart.checkout();
    }
}
