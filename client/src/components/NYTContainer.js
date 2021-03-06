import React, { Component } from "react";
// import { Link } from "react-router-dom";
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
    startYear: "",
    endYear: "",
    result: [],
    saved: []
  };


  //  When this component mounts, get the saved articles to display
  componentDidMount() {
    console.log("in component did mount", this.state);
    this.loadSavedArticles();
  }

  loadSavedArticles = () => {
    console.log("in loadSavedArticles");
    console.log("state: ", this.state);
    API_db.getSavedArticles()
      .then(result => {
        console.log("im about to display result");
        console.log(result.data[0]);
        console.log("state: ", this.state);
        const savedDetailsArray = [];
        result.data.forEach(function (element, i) {
          let details = {
            "details_key": i,
            "id": element._id,
            "title": element.title,
            "web_url": element.web_url,
            "pub_date": element.date_published,
            "snippet": element.snippet
          }
          savedDetailsArray.push(details);
          console.log("savedDetailsArray.length");
          console.log(savedDetailsArray.length);
        });
        this.setState({
          saved: savedDetailsArray
        });
      }).catch(err => {
        console.log(`Caught an error in loadSavedArticles: ${err}`);
      });
  }





  searchArticles = query => {
    console.log("Im in searchArticles")
    let beginDate;
    let endDate;
    if (this.state.startYear) {
      beginDate = this.state.startYear.toString() + "0101"
    };
    if (this.state.endYear) {
      endDate = this.state.endYear.toString() + "1231"
    };

    const query1 = ({
      'q': this.state.search,
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
    url += "apikey=c0b4d2e16a014795bbdce9d7e4df8a95";
    url += "&q=" + query1.q;
    if (query1.begin_date) {
      url += "&begin_date=" + query1.begin_date;
    }
    if (query1.end_date) {
      url += "&end_date=" + query1.end_date;
    }
    // url += "fl=web_url,snippet,pub_date,headline,_id";
    console.log(`url: ${url}`);
    axios
      .get(url)
      .then(response => {
        console.log(`came back successfully`);
        const detailsArray = [];

        response.data.response.docs.forEach(function (element, i) {
          let details = {
            "details_key": i,
            "title": response.data.response.docs[i].headline.main,
            "web_url": response.data.response.docs[i].web_url,
            "pub_date": response.data.response.docs[i].pub_date,
            "snippet": response.data.response.docs[i].snippet
          }
          detailsArray.push(details);
          console.log("detailsArray.length");
          console.log(detailsArray.length);
        });
        this.setState({
          result: detailsArray
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    // let value = event.target.value;
    // const name = event.target.name;
    const {name, value} = event.target;
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
      startYear: this.state.startYear,
      endYear: this.state.endYear
    });
    console.log("I just set the state");
    console.log(this.setState.search);
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
      startYear: "",
      endYear: "",
      result: []
    });
  };




  handleSave = (event) => {
    event.preventDefault();
    console.log(`im in handleSave`);
    console.log("value", event.target.value)
    let i = event.target.value; 
    let detailsToSave = {
      title: this.state.result[event.target.value].title,
      web_url: this.state.result[event.target.value].web_url,
      snippet: this.state.result[event.target.value].snippet,
      pub_date: this.state.result[event.target.value].pub_date
    }
    console.log(detailsToSave);
    API_db.saveArticle(detailsToSave);
    console.log("savedResult");
    this.removeFromResult(i);
    this.loadSavedArticles();

  };


  removeFromResult = (i) => {
    console.log(`im in removeFromResult`);
    let results = this.state.result
    results.splice(i,1);
    this.setState({
      result: results
    });
  }

  handleRemove = (event) => {
    console.log(`im in handleSave`);
    console.log("value", event.target.value)
    event.preventDefault();
    let id = event.target.value;
    console.log(`im in handleRemove ${id}`);
    API_db.deleteSavedArticle(id);
    this.loadSavedArticles();
  };


  render() {
    return (
      <Container>
        <Row>
          <Col size="sm-12">
            <Jumbotron heading="New York Times Search" />
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            <Panel heading="Search">
              <div>
                <form className="form" >
                  <label htmlform="search" > Search Topic: </label>
                  <input value={this.state.search}
                    name="search"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="" />
                  <label htmlform="search" > Start Year(Optional): </label>
                  <input value={this.state.startYear}
                    name="startYear"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="" />
                  <label htmlform="search" > End Year(Optional) </label>
                  <input value={this.state.endYear}
                    name="endYear"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="" />
                  <button id="searchBtn"
                    onClick={this.handleFormSubmit}
                    className="btn btn-primary" >
                    Search
      </button>
                  <button id="clearBtn"
                    onClick={this.handleFormClear}
                    className="btn btn-primary" > Clear </button>
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
                  {this.state.result.map(element =>
                    <li className="list-group-item"
                      key={element.details_key}>
                      <ArticleDetail
                        title={element.title}
                        web_url={element.web_url}
                        snippet={element.snippet}
                        pub_date={element.pub_date}
                      />
                      <button id="saveBtn"
                        onClick={this.handleSave}
                        value={element.details_key}
                        className="btn btn-primary" >
                        Save
                        </button>
                    </li>
                  )}
                </ul>
              </div>
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col size="sm-12">
            <Panel heading="Saved Articles">
              <div>
                <ul className="list-group">
                  {this.state.saved.map(element =>
                    <li className="list-group-item"
                      key={element.details_key}>
                      <ArticleDetail
                        title={element.title}
                        web_url={element.web_url}
                        snippet={element.snippet}
                        pub_date={element.pub_date}
                      />
                      <button id="removeBtn"
                        onClick={this.handleRemove}
                        value={element.id}
                        className="btn btn-primary" >
                        Remove
                        </button>
                    </li>
                  )}
                </ul>
              </div>
            </Panel>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NYTContainer;
