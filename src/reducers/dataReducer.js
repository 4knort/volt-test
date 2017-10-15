import * as types from 'constants/actionTypes';

const initialState = {
  customers: [],
  products: [],
}

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_COSTUMERS: {
      return {
        ...state,
        customers: action.payload,
      };
    }
    case types.SET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    
    default: {
      return state;
    }
  }
}