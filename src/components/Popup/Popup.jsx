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
    element: {},
    deleteAlert: false,
    showInputError: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      element: nextProps.elementModal.element
    })  
  }

  componentWillUnmount() {
    this.setState({showInputError: false})
  }

  closeAlert = () => {
    this.setState({deleteAlert: false})
  }

  handleInputChange(e, type) {
    const { name, value } = e.target;
    const { element } = this.state;

    element[name] = value;

    this.setState({ element });
  }

  validate = () => {
    if (this.state.element.name.length === 0) {
      this.setState({showInputError: true})
      return false;
    }

    return true;
  }
  
  render() {
    const fields = this.props.fields.map((field,index) => {
      return(
        <FormControl
          key={`form-control-${index}`}
          style={{marginBottom: '10px'}}
          type="text"
          name={field}
          placeholder={field}
          value={this.state.element[field]}
          onChange={(e) => {this.handleInputChange(e, field)}}
        />
      )
    })

    return(
      <div>
        <Modal show={this.props.elementModal.show} onHide={this.props.closeModal}>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
              <If condition={this.state.element.id}>
                <Button onClick={() => {
                  this.setState({deleteAlert: true});
                  }
                } bsStyle="danger">Delete {this.props.element}</Button>
              </If>
          </Modal.Header>
        
          <Modal.Body>
            <form>
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel bsClass={`control-label ${this.state.showInputError ? 'show' : ''} `}>Name cannot be empty</ControlLabel>
                  {fields}
                <FormControl.Feedback />
              </FormGroup>
            </form>
          </Modal.Body>
        
          <Modal.Footer>
            <Button onClick={this.props.closeModal}>Close</Button>
            <Choose>
              <When condition={this.state.element.id}>
                <Button bsStyle="primary" onClick={() => {
                  if(!this.validate()) return false;
                  this.props.modifyElement(this.state.element, 'update');
                  }
                }>Update {this.props.element}</Button>
              </When>
              <Otherwise>
                <Button bsStyle="primary" onClick={() => {
                  if(!this.validate()) return false;
                  this.props.modifyElement(this.state.element, 'save');
                  }
                }>Save {this.props.element}</Button>
              </Otherwise>
            </Choose>
          </Modal.Footer>
        </Modal>

        <If condition={this.state.deleteAlert}>
          <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
            <p>Are you sure you want to delete the {this.props.element}?</p>
            <p>
              <Button onClick={() => {
                this.props.modifyElement(this.state.element, 'delete');
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