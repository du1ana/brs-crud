import React, { Component } from "react";

export default class Navbar extends Component {

  
  render() {
 return (
   <div>
      <div className="btn-group font-weight-bold">
        <button className="btn btn-outline-primary" onClick={() => this.props.handleNavigation("")}>Books</button>
        <button className="btn btn-outline-primary" onClick={() => this.props.handleNavigation("")}>Reviews</button>
         <button className="btn btn-outline-primary" onClick={() => this.props.handleNavigation("")}>Libraries</button>
         <button className="btn btn-outline-primary" onClick={() => this.props.handleNavigation("author")}>Authors</button>
         <button className="btn btn-outline-primary" onClick={() => this.props.handleNavigation("")}>Publishers</button>
         <button className="btn btn-outline-primary" onClick={() => this.props.handleNavigation("user")}>Site Administrators</button>
      </div>
      &nbsp;
      <div className="btn-group">
         <button className="btn btn-outline-secondary" onClick={() => this.props.handleNavigation("acc")}>Account Settings</button>
         <button className="btn btn-outline-danger" onClick={() => this.props.handleNavigation("login")}>Log Out</button>
      </div>
    </div>
    );
  }
}

