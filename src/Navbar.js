import React, { Component } from "react";

export default class Navbar extends Component {

  
  render() {
 return (
      <div className="AppHeader">
        <button onClick={() => this.props.handleNavigation("user")}>View user list</button>
         <button onClick={() => this.props.handleNavigation("job")}>View job list</button>
         
         <button onClick={() => this.props.handleNavigation("login")}>Log Out</button>
      </div>
    );
  }
}

