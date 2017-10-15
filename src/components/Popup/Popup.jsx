import React, { Component } from 'react';
import {
  Modal, 
  FormControl,
  FormGroup, 
  Button, 
  ControlLabel, 
  HelpBlock,
  Table,
  Alert,
} from 'react-bootstrap';

import './popup.scss';

export default class Popup extends Component {
  state = {
    customer: {},
    deleteAlert: false,
    showInputError: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      customer: nextProps.customerModal.customer
    })  
  }

  componentWillUnmount() {
    this.setState({showInputError: false})
  }

  keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 107, 13, 190, 8, 107, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

  closeAlert = () => {
    this.setState({deleteAlert: false})
  }

  handleInputChange(e, type) {
    const { name, value } = e.target;
    const { customer } = this.state;

    customer[name] = value;

    this.setState({ customer });
  }

  validate = () => {
    if (this.state.customer.name.length === 0) {
      this.setState({showInputError: true})
      return false;
    }

    return true;
  }

  render() {
    return(
      <div>
        <Modal show={this.props.customerModal.show} onHide={this.props.closeModal}>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
              <If condition={this.state.customer.id}>
                <Button onClick={() => {
                  this.setState({deleteAlert: true});
                  }
                } bsStyle="danger">Delete Customer</Button>
              </If>
          </Modal.Header>
        
          <Modal.Body>
            <form>
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel bsClass={`control-label ${this.state.showInputError ? 'show' : ''} `}>Name cannot be empty</ControlLabel>
                <FormControl
                  style={{marginBottom: '10px'}}
                  type="text"
                  name="name"
                  placeholder={'name'}
                  value={this.state.customer.name}
                  onChange={(e) => {this.handleInputChange(e)}}
                />
                <FormControl.Feedback />
                <FormControl
                  style={{marginBottom: '10px'}}
                  type="text"
                  name="address"
                  placeholder={'address'}
                  value={this.state.customer.address}
                  onChange={(e) => {this.handleInputChange(e)}}
                />
                <FormControl.Feedback />
                <FormControl
                  type="text"
                  name="phone"
                  placeholder={'phone'}
                  value={this.state.customer.phone}
                  onChange={(e) => {this.handleInputChange(e, 'phone')}}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
          </Modal.Body>
        
          <Modal.Footer>
            <Button onClick={this.props.closeModal}>Close</Button>
            <Choose>
              <When condition={this.state.customer.id}>
                <Button bsStyle="primary" onClick={() => {
                  if(!this.validate()) return false;
                  this.props.modifieCustomer(this.state.customer, 'update');
                  }
                }>Update Customer</Button>
              </When>
              <Otherwise>
                <Button bsStyle="primary" onClick={() => {
                  if(!this.validate()) return false;
                  this.props.modifieCustomer(this.state.customer, 'save');
                  }
                }>Save Customer</Button>
              </Otherwise>
            </Choose>
          </Modal.Footer>
        </Modal>

        <If condition={this.state.deleteAlert}>
          <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
            <p>Are you sure you want to delete the customer?</p>
            <p>
              <Button onClick={() => {
                this.props.modifieCustomer(this.state.customer, 'delete');
                this.closeAlert(); 
                }
              } bsStyle="danger">Confirm</Button>
              <Button onClick={this.closeAlert}>Cancel</Button>
            </p>
          </Alert>
        </If>
      </div>
    )
  }
}