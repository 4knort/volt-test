import axios from 'axios';
import * as types from 'constants/actionTypes';

function setCostumers(data) {
  return {
    type: types.SET_COSTUMERS,
    payload: data,
  };
}

export function fetchCustomers() {
  return function thunkFetch(dispatch) {
    axios.get('/api/customers').then(response => {
      dispatch(setCostumers(response.data));
    });
  };
}

export function saveCustomer(customer) {
  return function thunkFetch(dispatch) {
    axios.post('/api/customers', customer).then(response => {
      dispatch(fetchCustomers());
    });
  };
}

export function updateCustomer(customer) {
  return function thunkFetch(dispatch) {
    axios.put(`/api/customers/${customer.id}`, customer).then(response => {
      dispatch(fetchCustomers());
    });
  };
}
export function deleteCustomer(customer) {
  return function thunkFetch(dispatch) {
    axios.delete(`/api/customers/${customer.id}`, customer).then(response => {
      dispatch(fetchCustomers());
    });
  };
}