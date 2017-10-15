import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popup } from 'components';
import * as dataActions from '../actions/dataActions';
import { Table } from 'react-bootstrap';

class Products extends Component {
  state = {
    elementModal: {
      show: false,
      element: {
        name: '',
        price: '',
      },
    },
  }

  componentWillMount() {
    this.props.fetchProducts();  
  }

  closeModal = () => {
    this.setState({ elementModal: {show: false, element: {}, } }); 
  }

  openModal = (element = this.state.elementModal.element) => {
    this.setState({ elementModal: {show: true, element, } });
  }

  modifyProduct = (product, action) => {
    switch(action) {
      case 'delete': {
        this.props.modifyProduct('delete', product);
        break;
      }
      case 'update': {
        this.props.modifyProduct('put', product);
        break;
      }
      case 'save': {
        this.props.saveProduct(product);
        break;
      }
    }

    this.closeModal();
  }

  render() {
    const products = this.props.products.map((product, index) => {
      return (
        <tr onClick={() => {this.openModal(product)}} key={`product-${index}`}>
          <td>{index}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
        </tr>
      )
    })

    return (
      <div>
        <h1>Products List</h1>
        <button onClick={() => {this.openModal()}}>Create</button>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products}
          </tbody>
        </Table>
        <Popup 
          elementModal={this.state.elementModal}
          closeModal={this.closeModal}
          modifyElement={this.modifyProduct}
          fields={['name', 'price']}
          errorText={'Name and price are required fields, price must consist of numbers'}
        />
      </div>
    )
  }
}

export default connect(state => ({
  products: state.dataReducer.products,
}), dataActions)(Products);