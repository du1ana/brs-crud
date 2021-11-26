import React, { Component } from "react";
import axios from "axios";
import Navbar from "./Navbar";


const JobRecord = (props) => {
    return (
      <tr>
        <td>{props.job.job_id}</td>
        <td>{props.job.jobtitle}</td>
        <td>{props.job.description}</td>
        <td>{props.job.salary}</td>
        <td>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
                  props.deleteJob(props.job.job_id);
            }}
          >Delete
          </button>
        </td>
      </tr>
    );
};

export default class JobList extends Component {
  constructor(props) {
    super(props);
    this.onTextboxChangeJobtitle = this.onTextboxChangeJobtitle.bind(this);
    this.onTextboxChangeDescription = this.onTextboxChangeDescription.bind(this);
    this.onTextboxChangeSalary = this.onTextboxChangeSalary.bind(this);
    this.onAdd = this.onAdd.bind(this);

    this.deleteJob = this.deleteJob.bind(this);
    this.refresh = this.refresh.bind(this);

    this.state = {
      updateFlag: true,
      joblist: []
    };
  }
  onTextboxChangeJobtitle(event) {
    this.setState({
      Jobtitle: event.target.value
    });
  }
  
  onTextboxChangeDescription(event) {
    this.setState({
      Description: event.target.value
    });
  }
  onTextboxChangeSalary(event) {
    this.setState({
      Salary: event.target.value
    });
  }
  
  onAdd() {
  
    axios
      .post("http://localhost:9191/job/add/", {
        jobtitle: this.state.Jobtitle,
        description: this.state.Description,
        salary: this.state.Salary
        
      })
      .then((res) => {
        console.log(res)
        this.refresh();
      })
      
    }
      

  async componentDidMount() {
    await this.getList();
  }

  getList = async () => {
    let res = await axios.get("http://localhost:9191/job/");
    this.setState({ joblist: res.data, updateFlag: false });
  };

  async componentDidUpdate() {
    if (this.state.updateFlag === true) {
      await this.getList();
    }
    console.log(this.state);
  }

  async deleteJob(id) {
    await axios
      .delete("http://localhost:9191/job/delete/"+id)
      .then((response) => {
        console.log(response.data);
      });
    this.refresh();
  }

 

  refresh() {
    this.setState({
      updateFlag: true,
    });
  }

  
  jobList(props) {
    return props.map((currentjob) => {
      return (
        <JobRecord
          job={currentjob}
          deleteJob={this.deleteJob}        
          key={currentjob.id}
        />
      );
    });
  }

  render() {
    const {
        Username,
        Description,
        Salary
      } = this.state;

    return (
      <div className="AppHeader">
         <Navbar handleNavigation={this.props.handleNavigation} />
           <div className="AddJob">
        <form>
          <h4>Add Jobs</h4>
          <table className="table-secondary center">
            <tr>
                <td><label>Jobtitle </label></td>
                  <td><input type="text" className="form-input" value={Username}
                      onChange={this.onTextboxChangeJobtitle}></input></td>
                      <td rowSpan="2"><input type="button" className="btn btn-primary" value="Add" onClick={this.onAdd}></input>
                      </td>
  </tr><tr><td>
          <label>Description 
          </label></td>
          <td>
          <input type="text" value={Description} onChange={this.onTextboxChangeDescription}></input>
  </td>
  </tr><tr><td>
          <label>Salary 
          </label></td>
          <td>
          <input type="text" value={Salary} onChange={this.onTextboxChangeSalary}></input>
  </td>
  
  </tr>
</table>
          
         
        </form><br/>
      </div>
        <h4>
Job List

        </h4>
        
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Jobtitle</th>
              <th>Description</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.jobList(this.state.joblist)}</tbody>
        </table>
      </div>
    );
  }
}

