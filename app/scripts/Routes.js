import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/utils/NotFound";
import AppliedRoute from "./components/utils/AppliedRoute";
import Find from "./components/Find";
import Login from "./components/Login";
import Signup from "./components/Signup";
import List from "./components/List";




export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Find} props={childProps} />
    <AppliedRoute path="/find/:id" exact component={Find} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/list" exact component={List} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
