import productsDataBase from './data/products.js'

import CartEvents from '../events/CartEvents'
import ProductEvents from '../events/ProductEvents'

export default class Cart {

    constructor() {
        this.total = 0;
        this._productsHash = {};
    }

    addProduct(newProduct, cartUpdatedCallback) {
        if (this._productsHash[newProduct.id]) {
            newProduct = this._productsHash[newProduct.id];
        }else{
            newProduct.quantity = 0;
            this._productsHash[newProduct.id] = newProduct;
        }
        newProduct.inventory--;
        newProduct.quantity++;

        this.total = this.products.reduce((prev, current) => { return prev + current.price; }, 0);

        if (newProduct.inventory==0) {
            ProductEvents.publishOnProductSoldOut(newProduct);
        }

        if (cartUpdatedCallback && cartUpdatedCallback !== null) {
            cartUpdatedCallback(this);
        }

        CartEvents.publishOnCartUpdated(this);
    }

    checkout() {
        this.total = 0;
        this._productsHash = {};

        CartEvents.publishOnCartUpdated(this);
    }

    get products() {
        var _self = this;
        return Object.keys(this._productsHash).map(function (id) {
            return _self._productsHash[id];
        });
    }
}
