import productsDataBase from './data/products.js'

import ProductEvents from '../events/ProductEvents'

export default class Product{

    static fetchAll(timeout, productsFetchedCallback) {
        if (productsFetchedCallback && productsFetchedCallback !== null) {
            productsFetchedCallback(productsDataBase);
        }

        ProductEvents.publishOnProductsFetched(productsDataBase);
    }

}
