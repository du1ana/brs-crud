
import './App.css';
import axios from 'axios';
import { Component } from 'react';


const BookRecord = (props) => {
  return (
    <div>
      <h5 className="card-title">{props.book.name}</h5>
      <p className="card-text">{props.book.isbn}</p>
        <br/>
        <hr></hr>
    </div>
  );
};



export default class Welcome extends Component {
  constructor(props) {
    super(props);


    this.state = {
      booklist: []
    };
  }

booklist(props){
  return props.map((currentbook) => {
    return (
      <BookRecord
      
        book={currentbook}
        key={currentbook.name}
      />
    );
  });
}



  getList(){
    axios
      .get('http://localhost:5000/book/list',)
      .then((response) => {
        console.log(response.data.data);
        this.setState({booklist:response.data.data})
      });
  }
  
  componentDidMount() {
    this.getList();
  }



  render() {
    return(
    <div className="Welcome">
      <p className="AppHeader">Welcome to the Book Review system.

        <button className="btn btn-primary btn-sm right" onClick={() => this.props.handleNavigation("login")}>Log in as a site admin</button>
        </p>
        <h5 className="cards">Currently following books are available:</h5>
        <br/>
        <div class="cards">{this.booklist(this.state.booklist)}</div>
    </div>
    )
  }
}

