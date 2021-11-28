import React, { Component } from "react";
import axios from "axios";
import Navbar from "./Navbar";


const AuthorRecord = (props) => {
  return (
    <tr>
      <td>{props.Author.name}</td>
      <td>{props.Author.genreSpec}</td>
      <td>{props.Author.authorDesc}</td>
      <td>{props.Author.nationality}</td>
      <td>{props.Author.books}</td>
      <td>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => {
            props.updateAuthor(props.Author.name);
          }}
        >Update
        </button>
      </td>
      <td>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => {
            props.deleteAuthor(props.Author.name);
          }}
        >Delete
        </button>
      </td>
    </tr>
  );
};

export default class AuthorList extends Component {
  constructor(props) {
    super(props);
    this.onTextboxChangeName = this.onTextboxChangeName.bind(this);
    this.onTextboxChangeGenreSpec = this.onTextboxChangeGenreSpec.bind(this);
    this.onTextboxChangeAuthorDesc = this.onTextboxChangeAuthorDesc.bind(this);
    this.onTextboxChangeNationality = this.onTextboxChangeNationality.bind(this);
    this.onTextboxChangeBooks = this.onTextboxChangeBooks.bind(this);

    this.onAdd = this.onAdd.bind(this);

    this.deleteAuthor = this.deleteAuthor.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);

    this.refresh = this.refresh.bind(this);

    this.state = {
      updateFlag: true,
      Authorlist: []
    };
  }


  onTextboxChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }
  onTextboxChangeGenreSpec(event) {
    this.setState({
      genreSpec: event.target.value
    });
  }

  onTextboxChangeNationality(event) {
    this.setState({
      nationality: event.target.value
    });
  }
  onTextboxChangeAuthorDesc(event) {
    this.setState({
      authorDesc: event.target.value
    });
  }

  onTextboxChangeBooks(event) {
    this.setState({
      books: event.target.value
    });
  }


  onAdd() {

    //Add Author
    axios
      .post("http://localhost:5000/author/newauthor/", {
        name: this.state.name,
        genreSpec: this.state.genreSpec,
        authorDesc: this.state.authorDesc,
        nationality: this.state.nationality,
        books: this.state.books,
      })
      .then((res) => {
        console.log(res)
        this.setState({ error: res.data.message })
        this.refresh();
      })

  }


  async componentDidMount() {
    await this.getList();
  }

  getList = async () => {
    let res = await axios.get("http://localhost:5000/author/list");
    console.log(res);
    this.setState({ Authorlist: res.data.data, updateFlag: false });
  };

  async componentDidUpdate() {
    if (this.state.updateFlag === true) {
      await this.getList();
    }
    console.log(this.state);
  }

  async deleteAuthor(name) {
    await axios
      .delete("http://localhost:5000/author/delete/", {
        data: {name:name}
      })
      .then((response) => {
        console.log(response.data);
      });
    this.refresh();
  }



  refresh() {
    this.setState({
      updateFlag: true,
      name: "",
      genreSpec: "",
      authorDesc: "",
      nationality: "",
      books: "",
    });
  }


  AuthorList(props) {
    return props.map((currentAuthor) => {
      return (
        <AuthorRecord
          Author={currentAuthor}
          deleteAuthor={this.deleteAuthor}
          key={currentAuthor.id}
        />
      );
    });
  }

  render() {
    const {
      name,
      genreSpec,
      authorDesc,
      nationality,
      books,
      error
    } = this.state;

    return (
      <div className="AppHeader">
        <Navbar handleNavigation={this.props.handleNavigation} />
        <div className="NewAuthor">
          <form>
            <h4>Add A New Author</h4>
            <table className="table-secondary center">
              <tr>
                <td><label>Author Name </label></td>
                <td><input type="text" className="form-input" value={name}
                  onChange={this.onTextboxChangeName}></input></td>
              </tr>
              <tr>
                <td><label>Genres written</label></td>
                <td>
                  <input type="text" value={genreSpec} onChange={this.onTextboxChangeGenreSpec}></input>
                </td>
              </tr>
              <tr>
                <td><label>Nationality</label></td>
                <td>
                  <input type="text" value={nationality} onChange={this.onTextboxChangeNationality}></input>
                </td>
              </tr>
              <tr>
                <td><label>About the Author</label></td>
                <td>
                  <textarea value={authorDesc} onChange={this.onTextboxChangeAuthorDesc}></textarea>
                </td>
              </tr>
              <tr>
                <td><label>Books Written</label></td>
                <td>
                  <textarea value={books} onChange={this.onTextboxChangeBooks}></textarea>
                </td>
              </tr>
              <tr><td colSpan="2"><input type="button" className="btn btn-primary" value="Add" onClick={this.onAdd}></input>
              </td></tr>

            </table>
            <p>{error}</p>

          </form><br />
        </div>
        <h4>
          Author List
        </h4>

        <table className="table">
          <thead className="thead-light">
            <tr>

              <th>Author Name</th>
              <th>Genres Written</th>
              <th>Nationality</th>
              <th>Author Description</th>
              <th>Books Written</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.AuthorList(this.state.Authorlist)}</tbody>
        </table>
      </div>
    );
  }
}