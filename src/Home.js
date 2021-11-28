import React, { Component } from "react";
import Welcome from "./Welcome";
import './App.css';
import Login from "./Login";
import User from "./User";
import JobList from "./Job";
import Author from "./Author";

export default class Home extends Component {
  constructor() {
    super();
    this.handleNavigation = this.handleNavigation.bind(this);

    this.state = {
      nav: "welcome"
    };
  }





  handleNavigation(str) {
    this.setState({ nav: str });
  }





  render() {
    switch (this.state.nav) {
      case "welcome":
        return <Welcome handleNavigation={this.handleNavigation}/>;
      case "login":
        return <Login handleNavigation={this.handleNavigation}/>;
        case "user":
        return <User handleNavigation={this.handleNavigation}/>;
        case "job":
          return <JobList handleNavigation={this.handleNavigation}/>;
        case "author":
          return <Author handleNavigation={this.handleNavigation}/>;
      default:
        return <p>default case x {this}</p>
      }
    }
}