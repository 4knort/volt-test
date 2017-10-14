import React, { PropTypes } from 'react';
import { Header } from 'components';

const App = ({ children }) => (
  <div className="app">
    <Header /> 
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.any.isRequired,
};

export default App;
