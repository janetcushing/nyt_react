import React from "react";
import ArticleDetail from "./ArticleDetail";
import Form from "./Form";

const Results = props =>
  <ul className="list-group">
    {props.result.map(result =>
      <li className="list-group-item" key={result.id}>
         <ArticleDetail
                    title= {this.state.result.title}
                    snippit={this.state.result.snippet}
                    url={this.state.result.web_url}
                    date={this.state.result.pub_date}
                  />
      </li>
    )}
  </ul>;

export default Results;
