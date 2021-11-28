import React, { Component } from "react";
import axios from "axios";
import Navbar from "./Navbar";


const BookRecord = (props) => {
    return (
      <tr>
        <td>{props.Book.title}</td>
        <td>{props.Book.isbn}</td>
        <td>{props.Book.availability}</td>
        <td>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
                  props.deleteBook(props.Book.isbn);
            }}
          >Delete
          </button>
        </td>
      </tr>
    );
};

export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.onTextboxChangetitle = this.onTextboxChangetitle.bind(this);
    this.onTextboxChangeisbn = this.onTextboxChangeisbn.bind(this);
    this.onTextboxChangeavailability = this.onTextboxChangeavailability.bind(this);
    this.onTextboxChangeAuthor =this.onTextboxChangeAuthor.bind(this);
    this.onAdd = this.onAdd.bind(this);

    this.deleteBook = this.deleteBook.bind(this);
    this.refresh = this.refresh.bind(this);

    this.state = {
      updateFlag: true,
      Booklist: []
    };
  }
  onTextboxChangetitle(event) {
    this.setState({
      title: event.target.value
    });
  }
  onTextboxChangeisbn(event) {
    this.setState({
      isbn: event.target.value
    });
  }
  
 
  onTextboxChangeavailability(event) {
    this.setState({
      availability: event.target.value
    });
  }

  onTextboxChangeAuthor(event) {
    this.setState({
      availability: event.target.value.author
    });
  }
  
  onAdd() {
  
    axios
      .post("http://localhost:5000/book/create/", {
        title: this.state.title,
        isbn: this.state.isbn,
        availability: this.state.availability,
      })
      .then((res) => {
        this.setState({error:res.data.message})
        this.refresh();
      })
      
    }
      

  async componentDidMount() {
    await this.getList();
  }

  getList = async () => {
    let res = await axios.get("http://localhost:5000/book/list");
    this.setState({ Booklist: res.data.data, updateFlag: false });
  };

  async componentDidUpdate() {
    if (this.state.updateFlag === true) {
      await this.getList();
    }
    console.log(this.state);
  }

  async deleteBook(id) {
    await axios
      .delete("http://localhost:5000/book/remove/",{
        data: { id: id }
      })
      .then((response) => {
        console.log(response.data);
      });
    this.refresh();
  }

 

  refresh() {
    this.setState({
      updateFlag: true,
      title:"",
      isbn:"",
      author:"",
      bookshelf:"",
      language:"",
      published:"",
      availability:""
    });
  }

  
  BookList(props) {
    return props.map((currentBook) => {
      return (
        <BookRecord
          Book={currentBook}
          deleteBook={this.deleteBook}        
          key={currentBook.id}
        />
      );
    });
  }

  render() {
    const {
        title,
        isbn,
        availability,
      } = this.state;

    return (
      <div className="AppHeader">
         <Navbar handleNavigation={this.props.handleNavigation} />
           <div className="AddBook">
        <form>
          <h4>Add Books</h4>
          <table className="table-secondary center">
            <tr>
                <td><label>Booktitle </label></td>
                  <td><input type="text" className="form-input" value={title}
                      onChange={this.onTextboxChangetitle}></input></td>
                      <td rowSpan="2"><input type="button" className="btn btn-primary" value="Add" onClick={this.onAdd}></input>
                      </td>
  </tr><tr><td>
          <label>ISBN
          </label></td>
          <td>
          <input type="text" value={isbn} onChange={this.onTextboxChangeisbn}></input>
  </td>
  </tr><tr><td>
          <label>Availability
          </label></td>
          <td>
          <input type="text" value={availability} onChange={this.onTextboxChangeavailability}></input>
  </td>
  
  </tr>
</table>
          
         
        </form><br/>
      </div>
        <h4>
Book List

        </h4>
        
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>ISBN</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>{this.BookList(this.state.Booklist)}</tbody>
        </table>
      </div>
    );
  }
}
