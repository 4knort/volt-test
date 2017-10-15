import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popup } from 'components';
import * as dataActions from '../actions/dataActions';
import { Table } from 'react-bootstrap';

class Customers extends Component {
  state = {
    elementModal: {
      show: false,
      element: {
        name: '',
        address: '',
        phone: '',
      },
    },
  }

  componentWillMount() {
    this.props.fetchCustomers();  
  }

  closeModal = () => {
    this.setState({ elementModal: {show: false, element: {}, } }); 
  }

  openModal = (element = this.state.elementModal.element) => {
    this.setState({ elementModal: {show: true, element, } });
  }

  modifyCustomer = (element, action) => {
    switch(action) {
      case 'delete': {
        this.props.modifyCustomer('delete', element);
        break;
      }
      case 'update': {
        this.props.modifyCustomer('put', element);
        break;
      }
      case 'save': {
        this.props.saveCustomer(element);
        break;
      }
    }

    this.closeModal();
  }

  render() {
    const customers = this.props.customers.map((customer, index) => {
      return (
        <tr onClick={() => {this.openModal(customer)}} key={`customer-${index}`}>
          <td>{index}</td>
          <td>{customer.name}</td>
          <td>{customer.address}</td>
          <td>{customer.phone}</td>
        </tr>
      )
    })

    return (
      <div>
        <h1>Customer List</h1>
        <button onClick={() => {this.openModal()}}>Create</button>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers}
          </tbody>
        </Table>
        <Popup 
          elementModal={this.state.elementModal}
          closeModal={this.closeModal}
          modifyElement={this.modifyCustomer}
          element={'Customer'}
          fields={['name', 'address', 'phone']}
          errorText={'Name cannot be empty'}
        />
      </div>
    )
  }
}

export default connect(state => ({
  customers: state.dataReducer.customers,
}), dataActions)(Customers);