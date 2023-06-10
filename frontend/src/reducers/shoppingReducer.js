import TYPES from "../actions/shoppingActions"

export const shoppingInitialState = {
    products: [
        {id: 1, name: "p1", price:100},
        {id: 2, name: "p2", price:110},
        {id: 3, name: "p3", price:120},
        {id: 4, name: "p4", price:130},
        {id: 5, name: "p5", price:140},
        {id: 6, name: "p6", price:150},
    ],
    cart: []
}

export default function shoppingReducer(state, action) {
    switch (action.type) {
        case TYPES.ADD_TO_CART: {

        } 
        case TYPES.REMOVE_ONE_FROM_CART: {

        }
        case TYPES.REMOVE_ONE_FROM_CART: {

        }
        case TYPES.CLEAR_CART: {

        }
        default:
            return state
    }
}