import { TYPES } from "../actions/crudActions";

export const crudInitialState = {
  products: null,
};

export function crudReducer(state, action) {
  switch (action.type) {
    case TYPES.READ_ALL_DATA: {
      //console.log(action.payload);
      return {
        ...state,
        products: action.payload.map((data) => data),
      };
    }
    case TYPES.CREATE_DATA: {
      //console.log(action.payload);
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }
    case TYPES.UPDATE_DATA: {
      //console.log(action.payload);

      let newData = state.products.map((el) =>
        el._id === action.payload._id ? action.payload : el
      );

      return {
        ...state,
        products: newData,
      };
    }
    case TYPES.DELETE_DATA: {
      //console.log(action.payload);
      let newData = state.products.filter((el) => el._id !== action.payload);

      return {
        ...state,
        products: newData,
      };
    }
    case TYPES.NO_DATA:
      return crudInitialState;
    default:
      return state;
  }
}