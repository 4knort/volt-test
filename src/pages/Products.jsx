// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Popup } from 'components';
// import * as dataActions from '../actions/dataActions';
// import { Table } from 'react-bootstrap';

// class Products extends Component {
//   state = {
//     elementModal: {
//       show: false,
//       element: {
//         name: '',
//         address: '',
//         phone: '',
//       },
//     },
//   }

//   componentWillMount() {
//     this.props.fetchProducts();  
//   }

//   closeModal = () => {
//     this.setState({ elementModal: {show: false, element: {}, } }); 
//   }

//   openModal = (element = this.state.elementModal.element) => {0
//     this.setState({ elementModal: {show: true, element, } });
//   }

//   modifyCustomer = (product, action) => {
//     switch(action) {
//       case 'delete': {
//         this.props.modifyProduct('delete', product);
//         break;
//       }
//       case 'update': {
//         this.props.modifyProduct('put', product);
//         break;
//       }
//       case 'save': {
//         this.props.saveProduct(product);
//         break;
//       }
//     }

//     this.closeModal();
//   }

//   render() {
//     const customers = this.props.products.map((customer, index) => {
//       return (
//         <tr onClick={() => {this.openModal(customer)}} key={`customer-${index}`}>
//           <td>{index}</td>
//           <td>{customer.name}</td>
//           <td>{customer.address}</td>
//           <td>{customer.phone}</td>
//         </tr>
//       )
//     })

//     return (
//       <div>
//         <h1>Customer List</h1>
//         <button onClick={() => {this.openModal()}}>Create</button>
//         <Table striped bordered condensed hover>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>First Name</th>
//               <th>Address</th>
//               <th>Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers}
//           </tbody>
//         </Table>
//         <Popup 
//           customerModal={this.state.customerModal}
//           closeModal={this.closeModal}
//           modifyCustomer={this.modifyCustomer}
//         />
//       </div>
//     )
//   }
// }

// export default connect(state => ({
//   customers: state.dataReducer.customers,
// }), dataActions)(Products);