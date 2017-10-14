import * as types from 'constants/actionTypes';

const initialState = {
  customers: [],
}

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_COSTUMERS: {
      return {
        ...state,
        customers: action.payload,
      };
    }
    
    default: {
      return state;
    }
  }
}