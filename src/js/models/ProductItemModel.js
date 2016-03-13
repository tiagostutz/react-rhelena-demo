import { RhelenaPresentationModel } from 'rhelena'

import __sessionData from '../stores/SessionDataStore.js'

export default class ProductItemModel extends RhelenaPresentationModel{


    constructor() {
        super();
     }

     addToCart() {
         __sessionData.currentCart.addProduct(this.product);
     }

}
