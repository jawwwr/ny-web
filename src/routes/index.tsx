import * as React from "react";
import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import OtherPage from "pages/OtherPage";
import AutoPayout from "pages/AutoPayout";
import Transfers from "pages/Transfers";
import Schedule from "pages/Schedule";
import ScheduleCreate from "pages/ScheduleCreate";
import DateTimePickers from "pages/DateTimePickers";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const Routes = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/admin/balances" component={Dashboard} />
      <Route exact path="/admin/balances/auto-payout" component={AutoPayout} />
      <Route exact path="/admin/transfers" component={Transfers} />
      <Route exact path="/admin/schedule" component={Schedule} />
      <Route exact path="/admin/schedule/create" component={ScheduleCreate} />
      <Route exact path="/admin/schedule/list" component={Schedule} />
      <Route
        exact
        path="/admin/date-time-pickers"
        component={DateTimePickers}
      />
      <Route exact path="/admin/other-page" component={OtherPage} />
      <Route exact path="/login" component={() => <h1>Login</h1>} />
      <Route exact path="/404" component={() => <h1>Page not found.</h1>} />
      <Redirect to="/404" push={false} />
    </Switch>
  </Router>
);

export default Routes;
