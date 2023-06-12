import { TYPES } from '../actions/shoppingActions'
import axios from 'axios'

export const shoppingInitialState = {
    products: [],
    cart: []
}

export function fetchProducts() {
    const rute = "http://localhost:3000/api"
    return axios.get(`${rute}/product`)
        .then((resp) => {
            const products = resp.data
            console.log("resp.data", products)
            shoppingInitialState.products = products
            return resp.data
        })
        .catch(e => {
            console.error('Error al obtener los productos: ', e)
            throw e
        })
}

export function shoppingReducer(state, action) {
    switch (action.type) {
        case TYPES.ADD_TO_CART: {
            let newItem = state.products.find(
            (product) => product._id === action.payload
            );
            console.log("item añadido al carro", newItem)
            let itemInCart = state.cart.find((item) => item._id === newItem._id);
            
            console.log({ ...state.cart })
            console.log("cantidad", itemInCart.quantity)

            return itemInCart
            ? {
                ...state,
                cart: state.cart.map((item) =>
                    item._id === newItem._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
                } 
            : {
                ...state,
                cart: [...state.cart, { ...newItem, quantity: 1 }],
                };

        }
        case TYPES.REMOVE_ONE_FROM_CART: {
            let itemToDelete = state.cart.find((item) => item._id === action.payload);
    
            return itemToDelete.quantity > 1
            ? {
                ...state,
                cart: state.cart.map((item) =>
                    item._id === action.payload
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                ),
                }
            : {
                ...state,
                cart: state.cart.filter((item) => item._id !== action.payload),
                };
        }
        case TYPES.REMOVE_ALL_FROM_CART: {
            return {
            ...state,
            cart: state.cart.filter((item) => item._id !== action.payload),
            };
        }
        case TYPES.CLEAR_CART:
            return shoppingInitialState;
        default:
            return state;
    }
}