import React, { Component } from "react";
import axios from "axios";
import Navbar from "./Navbar";


const UserRecord = (props) => {
    return (
      <tr>
        <td>{props.User.username}</td>
        <td>{props.User.name}</td>
        <td>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
                  props.deleteUser(props.User.username);
            }}
          >Delete
          </button>
        </td>
      </tr>
    );
};

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.onTextboxChangeUsername = this.onTextboxChangeUsername.bind(this);
    this.onTextboxChangeName = this.onTextboxChangeName.bind(this);
    this.onTextboxChangePassword = this.onTextboxChangePassword.bind(this);
    this.onAdd = this.onAdd.bind(this);

    this.deleteUser = this.deleteUser.bind(this);
    this.refresh = this.refresh.bind(this);

    this.state = {
      updateFlag: true,
      Userlist: []
    };
  }
  onTextboxChangeUsername(event) {
    this.setState({
      signInUsername: event.target.value
    });
  }

  onTextboxChangeName(event) {
    this.setState({
      signInName: event.target.value
    });
  }
  onTextboxChangePassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }
  
  onAdd() {
  
    //post request sigin up
    axios
      .post("http://localhost:5000/user/signup/", {
        username: this.state.signInUsername,
        name: this.state.signInName,
        password: this.state.signInPassword,
      })
      .then((res) => {
        console.log(res)
        this.setState({error:res.data.message})
        this.refresh();
      })
      
    }
      

  async componentDidMount() {
    await this.getList();
  }

  getList = async () => {
    let res = await axios.get("http://localhost:5000/user/list");
    console.log(res);
    this.setState({ Userlist: res.data.data, updateFlag: false });
  };

  async componentDidUpdate() {
    if (this.state.updateFlag === true) {
      await this.getList();
    }
    console.log(this.state);
  }

  async deleteUser(username) {
    await axios
      .delete("http://localhost:5000/user/delete/",{
        data:{username:username}
      })
      .then((response) => {
        console.log(response.data);
      });
    this.refresh();
  }

 

  refresh() {
    this.setState({
      updateFlag: true,
      signInName:"",
      signInUsername:"",
      signInPassword:""
    });
  }

  
  UserList(props) {
    return props.map((currentUser) => {
      return (
        <UserRecord
          User={currentUser}
          deleteUser={this.deleteUser}        
          key={currentUser.id}
        />
      );
    });
  }

  render() {
    const {
        signInUsername,
        signInPassword,
        signInName,
        error
      } = this.state;

    return (
      <div className="AppHeader">
         <Navbar handleNavigation={this.props.handleNavigation} />
           <div className="AddUser">
             <br/>
        <form>
          <h4>Sign-Up New Site Administrator</h4>
          <table className="table-secondary center">
            <tr>
                <td><label>Username </label></td>
                  <td><input type="text" className="form-input" value={signInUsername}
                      onChange={this.onTextboxChangeUsername}></input></td>
                      
  </tr><tr><td>
          <label>Name 
          </label></td>
          <td>
          <input type="text" value={signInName} onChange={this.onTextboxChangeName}></input>
  </td>
  </tr>
  <tr><td>
          <label>Password 
          </label></td>
          <td>
          <input type="password" value={signInPassword} onChange={this.onTextboxChangePassword}></input>
  </td>
  </tr>
  <tr><td colSpan="2"><input type="button" className="btn btn-primary" value="Sign-up" onClick={this.onAdd}></input>
                      </td></tr>
                      
</table>
<p>{error}</p>
         
        </form><br/>
      </div>
        <h4>
Site Administrator List

        </h4>
        
        <table className="table">
          <thead className="thead-light">
            <tr>
              
              <th>Username</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.UserList(this.state.Userlist)}</tbody>
        </table>
      </div>
    );
  }
}

