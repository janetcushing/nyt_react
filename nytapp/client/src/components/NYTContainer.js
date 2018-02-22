import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Panel from "./Panel";
import Jumbotron from "./Jumbotron";
// import Form from "./Form";
import axios from "axios";
// import Results from "./Results";
import API_db from "../utils/API_db";
import ArticleDetail from "./ArticleDetail";


class NYTContainer extends Component {
 // Setting the component's initial state
 state = {
  search: "",
  numRecs: "",
  startYear: "",
  endYear: "",
  result: []
};


  searchArticles = query => {
    console.log("Im in searchArticles")
    let recCount = 0;
    let beginDate;
    let endDate;
    if(this.state.numRecs){
      recCount = this.state.numRecs
    } else {recCount = 2};
    if(this.state.startYear){
      beginDate = this.state.startYear + "0101"};
      if(this.state.endYear){
        endDate = this.state.endYear + "1231"};
    
    const query1 = ({
      'q': this.state.search,
      'fq': recCount,
      'begin_date': beginDate,
      'end_date': endDate
    });
    console.log("query1: ");
    console.log(query1);
    // API.search(query)
    //   .then(res => this.setState({ result: res.data }))
    //   .catch(err => console.log(err));
    let url =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
      url += "apikey=c0b4d2e16a014795bbdce9d7e4df8a95"
      url += "&q="  + query1.q;
      url += "&fq=" + query1.fq;
      console.log(`url: ${url}`);
    axios
      .get(url)
      .then(response => {
        console.log(`came back successfully`);
        const detailsArray = [];
        
        response.data.response.docs.forEach(function(element, i){
         let details = {
            "details_key": i,
            "title": response.data.response.docs[i].headline.main,
            "web_url": response.data.response.docs[i].web_url ,
            "pub_date": response.data.response.docs[i].pub_date ,
            "snippet": response.data.response.docs[i].snippet
          }
          detailsArray.push(details);
          console.log("detailsArray.length");
          console.log(detailsArray.length);
        });
        this.setState({
          result: detailsArray
        });
        console.log("setState result");
        console.log(this.state.result);
      })
      .catch(error => {
        console.log(error);
      });
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
    this.searchArticles(this.state.search);
    // this.setState({
    //   result: detailsArray
    // });
  };

  handleFormClear = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    this.setState({
      search: "",
      numRecs: "",
      startYear: "",
      endYear: "",
      result: []
    });
  };

  //  When this component mounts, get the saved articles to display
  componentDidMount() {
    console.log("in componentDidMount");
    const response = API_db.getSavedArticles();
    console.log(response);
  }

  handleSave = result => {
    console.log(`im in handleSave ${result.title}`);
    API_db.saveArticle(result);
    console.log("result");
    console.log(result);
  }

  handleRemove = id =>{
    console.log(`im in handleRemove ${id}`);
    API_db.deleteSavedArticle(id);
  }


  render() {
    return (
      <Container>
        <Row>
          <Col size="sm-12">
            <Jumbotron heading="New York Times Search"/>
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            <Panel heading="Search">
            <div>
      <form className = "form" >
      <label htmlform = "search" > Search Topic: </label> 
      <input value = {this.state.search}
      name = "search"
      onChange = {this.handleInputChange}
      type = "text"
      placeholder = "" /> 
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
        <label htmlform = "search" > Number of Records to Retrieve: </label>
      <input value = {this.state.numRecs}
      name = "numRecs"
      onChange = {this.handleInputChange}
      type = "text"
      placeholder = "Default: 10" />
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
            </Panel>
          </Col>
        </Row>
   
        <Row>
          <Col size="sm-12">
            <Panel heading="Top Articles">
            <div>  
                 <ul className="list-group">
                    {this.state.result.map(result =>
                   <li className="list-group-item" 
                   key={result.details_key}>
                     <ArticleDetail
                    title= {result.title}
                    web_url={result.web_url}
                    snippit={result.snippet}
                    pub_date={result.pub_date}      
                  /> 
                  <button id = "saveBtn"
      onClick = {this.handleSave}
      className = "btn btn-primary" >
      Save 
      </button> </li>
    )}
  </ul>
  </div>
            </Panel>
          </Col>  
        </Row>

         <Row>
          <Col size="sm-12">
            <Panel heading="Saved Articles">
              {this.state.result
                ? <div>
                <h3>{this.state.result.title}</h3>
                <p>{this.state.result.web_url}</p>
                <p>{this.state.result.snippet}</p>
                <p>{this.state.result.pub_date}</p>
                <button id = "removeBtn"
      onClick = {this.handleRemove}
      className = "btn btn-primary" >
      Remove
      </button> 
                </div>
                : <h3>No Results to Display</h3>}
            </Panel>
          </Col>  
        </Row>
      </Container>
    );
  }
}

export default NYTContainer;
