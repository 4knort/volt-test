import axios from 'axios';
import * as types from 'constants/actionTypes';

function setCostumers(data) {
  return {
    type: types.SET_COSTUMERS,
    payload: data,
  };
}

function setProducts(data) {
  return {
    type: types.SET_PRODUCTS,
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

export function fetchProducts() {
  return function thunkFetch(dispatch) {
    axios.get('/api/products').then(response => {
      dispatch(setProducts(response.data));
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

export function modifyCustomer(type, customer) {
  return function thunkFetch(dispatch) {
    axios[type](`/api/customers/${customer.id}`, customer).then(response => {
      dispatch(fetchCustomers());
    });
  };
}

export function saveProduct(product) {
  return function thunkFetch(dispatch) {
    axios.post('/api/products', product).then(response => {
      dispatch(fetchProducts());
    });
  };
}

export function modifyProduct(type, product) {
  return function thunkFetch(dispatch) {
    axios[type](`/api/products/${product.id}`, product).then(response => {
      dispatch(fetchProducts());
    });
  };
}
