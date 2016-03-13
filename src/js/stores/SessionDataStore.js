/**
 * This is the global singleton store that holds the data from the users Session.
 */

import Cart from '../domain/Cart.js'

let __sessionData = {
    currentCart : new Cart()
}

export default __sessionData;
