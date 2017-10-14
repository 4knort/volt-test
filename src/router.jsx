import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Customers } from 'pages';
import { App } from 'components';

const AppRouter = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Customers} />
    </Route>
  </Router>
);

AppRouter.propTypes = { history: PropTypes.object.isRequired };

export default AppRouter;