import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popup } from 'components';
import * as dataActions from '../actions/dataActions';
import { Table } from 'react-bootstrap';

class Customers extends Component {
  state = {
    customerModal: {
      show: false,
      customer: {
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
    this.setState({ customerModal: {show: false, customer: {}, } }); 
  }

  openModal = (customer = this.state.customerModal.customer) => {0
    this.setState({ customerModal: {show: true, customer, } });
  }

  modifieCustomer = (customer, action) => {
    switch(action) {
      case 'delete': {
        this.props.deleteCustomer(customer);
        break;
      }
      case 'update': {
        this.props.updateCustomer(customer);
        break;
      }
      case 'save': {
        this.props.saveCustomer(customer);
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
          customerModal={this.state.customerModal}
          closeModal={this.closeModal}
          modifieCustomer={this.modifieCustomer}
        />
      </div>
    )
  }
}

export default connect(state => ({
  customers: state.dataReducer.customers,
}), dataActions)(Customers);