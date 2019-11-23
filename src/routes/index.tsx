import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from 'pages/Home';
import Dashboard from 'pages/Dashboard';
import Restaurant from 'pages/Restaurant';
import OtherPage from 'pages/OtherPage';
import Navbar from 'components/Navbar'

const Routes = (
  <Router>
    <Navbar />
      <div className="container main-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/profile" component={Dashboard} />
          <Route exact path="/user/other-page" component={OtherPage} />
          <Route exact path="/restaurants/:id" component={Restaurant} />
          <Route exact path="/login" component={() => <h1>Login</h1>} />
          <Route exact path="/404" component={() => <h1>Page not found.</h1>} />
          <Redirect to="/404" push={false} />
        </Switch>
      </div>
  </Router>
)

export default Routes