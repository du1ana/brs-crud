import React, { Component } from "react";
import axios from "axios";
import Navbar from "./Navbar";




export default class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.onTextboxChangeUsername = this.onTextboxChangeUsername.bind(this);
    this.onTextboxChangeOldPassword = this.onTextboxChangeOldPassword.bind(this);
    this.onTextboxChangeNewPassword = this.onTextboxChangeNewPassword.bind(this);
    this.onUpdate = this.onUpdate.bind(this);


    this.state = {
      updateFlag: true
    };
  }
  onTextboxChangeUsername(event) {
    this.setState({
      Username: event.target.value
    });
  }

  onTextboxChangeOldPassword(event) {
    this.setState({
      OldPassword: event.target.value
    });
  }
  onTextboxChangeNewPassword(event) {
    this.setState({
      NewPassword: event.target.value
    });
  }
  
  onUpdate() {
  
    //post request
    axios
      .post("http://localhost:5000/user/changepassword/", {
        username: this.state.Username,
        oldpassword: this.state.OldPassword,
        newpassword: this.state.NewPassword,
      })
      .then((res) => {
        console.log(res)
        this.setState({error:res.data.message})
        this.refresh();
      })
      
    }
      

  


 

  refresh() {
    this.setState({
      updateFlag: true,
      OldPassword:"",
      Username:"",
      NewPassword:""
    });
  }

  

  render() {
    const {
        Username,
        NewPassword,
        OldPassword,
        error
      } = this.state;

    return (
      <div className="AppHeader">
         <Navbar handleNavigation={this.props.handleNavigation} />
           <div className="UpdateUser">
             <br/>
        <form>
          <h4>Change Password</h4>
          <table className="table-secondary center">
            <tr>
                <td><label>Username </label></td>
                  <td><input type="text" className="form-input" value={Username}
                      onChange={this.onTextboxChangeUsername}></input></td>
                      
  </tr><tr><td>
          <label>Old Password 
          </label></td>
          <td>
          <input type="password" value={OldPassword} onChange={this.onTextboxChangeOldPassword}></input>
  </td>
  </tr>
  <tr><td>
          <label>New Password 
          </label></td>
          <td>
          <input type="password" value={NewPassword} onChange={this.onTextboxChangeNewPassword}></input>
  </td>
  </tr>
  <tr><td colSpan="2"><input type="button" className="btn btn-primary" value="Update Password" onClick={this.onUpdate}></input>
                      </td></tr>
                      
</table>
<p>{error}</p>
         
        </form><br/>
      </div>
      </div>
    );
  }
}

