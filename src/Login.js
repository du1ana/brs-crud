
import './App.css';
import {Component} from 'react';
import axios from 'axios';

export default class Login extends Component{
  constructor(props) {
    super(props);

    this.onTextboxChangeUsername = this.onTextboxChangeUsername.bind(this);
    this.onTextboxChangePassword = this.onTextboxChangePassword.bind(this);
    this.onSignin = this.onSignin.bind(this);
    this.onBack = this.onBack.bind(this);

    this.state = {
      signInUsername: "",
      signInPassword: "",
      signinerror:""
    };
  }

  render(){
    const {
      signInUsername,
      signInPassword
    } = this.state;
  return (
    <div className="Login AppHeader">
      <form>
        <h2>User Log-in</h2>
        <table className="table-secondary center">
          <tr>
              <td><label>Username </label></td>
                <td><input type="text" className="form-input" value={signInUsername}
                    onChange={this.onTextboxChangeUsername}></input></td>
</tr><tr><td>
        <label>Password 
        </label></td>
        <td>
        <input type="password" value={signInPassword} onChange={this.onTextboxChangePassword}></input>
</td></tr><tr>
<label>{this.state.signinerror}</label>
</tr></table>
<input type="button" className="btn btn-primary rightmargin" value="Back" onClick={this.onBack}></input>
        <input type="button" className="btn btn-primary" value="Submit" onClick={this.onSignin}></input>
        
       
      </form>
    </div>
  );
}

onTextboxChangeUsername(event) {
  this.setState({
    signInUsername: event.target.value
  });
}

onTextboxChangePassword(event) {
  this.setState({
    signInPassword: event.target.value
  });
}

onSignin() {

  //post request sigin in
  axios
    .post("http://localhost:5000/user/login/", {
      username: this.state.signInUsername,
      password: this.state.signInPassword,
    })
    .then((res) => {
      console.log(res)
      if(!res.data.success){
        this.setState({
          username: '',
      password: '',
          signinerror:res.data.message
        });
      }else{
        this.setState({
          signinerror:"Valid sign-in"
        });
        this.props.handleNavigation("user");
      }
    })}

    onBack(){
      this.props.handleNavigation("welcome");
  }
}

