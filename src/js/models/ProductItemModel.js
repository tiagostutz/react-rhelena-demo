import { RhelenaPresentationModel } from 'rhelena'

import Cart from '../domain/Cart.js'


export default class ProductItemModel extends RhelenaPresentationModel{


    constructor() {
        super();
     }

     addToCart() {
         Cart.add(this.product);
     }

}
