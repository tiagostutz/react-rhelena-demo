import { RhelenaPresentationModel } from 'rhelena'

import __sessionData from '../stores/SessionDataStore.js'

import Product from '../domain/Product.js'

import CartModel from '../models/CartModel'
import ProductListModel from '../models/ProductListModel'

import CartEvents from '../events/CartEvents'
import ProductEvents from '../events/ProductEvents'

export default class AppModel extends RhelenaPresentationModel{


    constructor() {
        super();
        var _self = this;

        //initialize data
        this.availableProducts = [];
        this.unavailableProducts = [];
        this.cart = __sessionData.currentCart;

        ProductEvents.subscribeToProductSoldOut( soldOutProduct => {
            let updatedList = _self.availableProducts;
            let soldOutList = _self.unavailableProducts;
            for (var i = 0; i < updatedList.length; i++) {
                if(updatedList[i].id == soldOutProduct.id) {
                    updatedList.splice(i,1);
                }
            }

            soldOutList.push(soldOutProduct);

            _self.availableProducts = updatedList
            _self.unavailableProducts = soldOutList;
        } );
        CartEvents.subscribeToCartUpdated( cartData => { _self.cart = cartData; } );

        //call the API that will publish the result on the subscribed topics above.
        //If we wanted a more sofisticated approach, we would subscribe to event topics that will notify any change to the model regardless if the fetch method
        //was invoked from this or another class
        //e.g.: if one user adds to cart a product and we want to update the product list from another person online, we just publish the updated product list to
        //the user. Or we could even publish just the product update and it would be updated in everyone that is seeing it
        Product.fetchAll( fetchedProducts => { _self.availableProducts = fetchedProducts } );
     }

}
