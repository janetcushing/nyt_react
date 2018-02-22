import React, {
  Component
} from "react";
import API from "../../utils/API";
import "./Form.css";
import axios from "axios";

class Form extends Component {
  // Setting the component's initial state
  state = {
    search: "",
    numRecs: "",
    startYear: "",
    endYear: "",
    result: {}
  };

  searchArticles = query => {
    console.log("Im in searchArticles")
    query = ({
      'q': "obama",
      'begin_date': "20180101",
      'end_date': "20180131"
    });
    console.log("query: ");
    console.log(query);
    // API.search(query)
    //   .then(res => this.setState({ result: res.data }))
    //   .catch(err => console.log(err));
    const url =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?apikey=c0b4d2e16a014795bbdce9d7e4df8a95&q=obama";

    axios
      .get(url)
      .then(response => {
        console.log(
          `came back successfully`,
          `title: ${response.data.response.docs[0].headline.main} -`,
          `url: ${response.data.response.docs[0].web_url} -`,
          `date pub: ${response.data.response.docs[0].date_pub} -`,
          `snippet: ${response.data.response.docs[0].snippet}`
        );
        let details = {
          "title": response.data.response.docs[0].headline.main,
          "url": response.data.response.docs[0].web_url ,
          "date_pub": response.data.response.docs[0].date_pub ,
          "snippet": response.data.response.docs[0].snippet
        }
        this.setState({
          result: details
        });
      })
      .catch(error => {
        console.log(error);
      });
    console.log("back from search");
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    console.log("im in handleFormSubmit");
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    if (!this.state.search) {
      alert("Please add search criteria");
    }
    console.log(this.state.search);
    console.log(this.state.numRecs);
    this.setState({
      search: this.state.search,
      numRecs: this.state.numRecs,
      startYear: this.state.startYear,
      endYear: this.state.endYear
    });
    console.log("I just set the state");
    console.log(this.setState.search);
    console.log(this.setState.numRecs);
    let details = this.searchArticles(this.state.search);
    this.setState({
      result: details
    });
  };

  handleFormClear = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    this.setState({
      search: "",
      numRecs: "",
      startYear: "",
      endYear: ""
    });
  };

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return ( 
    <div>
      <form className = "form" >
      <label htmlform = "search" > Search: </label> 
      <input value = {this.state.search}
      name = "search"
      onChange = {this.handleInputChange}
      type = "text"
      placeholder = "" />
      <label htmlform = "search" > Number of Records to Retrieve: </label>
      <input value = {this.state.numRecs}
      name = "numRecs"
      onChange = {this.handleInputChange}
      type = "text"
      placeholder = "5" />
      <label htmlform = "search" > Start Year(Optional): </label> 
      <input value = {this.state.startYear}
      name = "startYear"
      onChange = {this.handleInputChange}
      type = "text"
      placeholder = "" />
      <label htmlform = "search" > End Year(Optional) </label> 
      <input value = {this.state.endYear}
      name = "endYear"
      onChange = {this.handleInputChange}
      type = "text"
      placeholder = "" />
      <button id = "searchBtn"
      onClick = {this.handleFormSubmit}
      className = "btn btn-primary" >
      Search 
      </button> 
      <button id = "clearBtn"
      onClick = {this.handleFormClear}
      className = "btn btn-primary" > Clear </button>
      </form> 
      </div>
    );
  }
}

export default Form;