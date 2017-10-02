import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import Routes from "../Routes";
import RouteNavItem from "./utils/RouteNavItem";

class SearchBox extends Component {

  handleChange(event) {
    event.target.select();
  }
  render() {
    return (
            <div className="col-xs-12 col-xs-6 col-xs-7">
              <form className="searchbox">
                {/* <label> */}
                  <input ref="search suggestion" onClick={this.handleChange} className="searchbox__input typeahead form-control" type="text" placeholder="Search Movie Title..." id="q" />
                {/* </label> */}
                </form>
            </div>
    )
  }

}
module.exports = SearchBox;
