import React, { Component } from 'react';
import {
  Modal, 
  FormControl,
  FormGroup, 
  Button, 
  ControlLabel, 
  HelpBlock,
  Table,
} from 'react-bootstrap';

export default class Popup extends Component {
  state = {
    customer: {}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      customer: nextProps.customerModal.customer
    })  
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const { customer } = this.state;

    customer[name] = value

    this.setState({ customer });
  }

  render() {
 
    return(
      <Modal show={this.props.customerModal.show} onHide={this.props.closeModal}>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
            <If condition={this.state.customer.id}>
              <Button onClick={() => {this.props.deleteCustomer(this.state.customer)}} bsStyle="danger">Delete Customer</Button>
            </If>
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormGroup
              controlId="formBasicText"
            >
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
                onChange={(e) => {this.handleInputChange(e)}}
              />
              <FormControl.Feedback />
            </FormGroup>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
          <Choose>
            <When condition={this.state.customer.id}>
              <Button bsStyle="primary" onClick={() => {this.props.updateCustomer(this.state.customer)}}>Update Customer</Button>
            </When>
            <Otherwise>
              <Button bsStyle="primary" onClick={() => {this.props.saveCustomer(this.state.customer); console.log(this.state.customer)}}>Save Customer</Button>
            </Otherwise>
          </Choose>
        </Modal.Footer>
      </Modal>
    )
  }
}