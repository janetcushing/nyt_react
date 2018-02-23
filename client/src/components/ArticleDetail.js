import React from "react";


const ArticleDetail = props => (
  <div className="text-center">
   <h4>
   <a href={props.web_url}>{props.title}</a>
    </h4>
    <p>
      <b>Snippet:</b> {props.snippet}
    </p>
    <p>
      <b>Date Published:</b> {props.pub_date}
    </p>
  </div>
);
export default ArticleDetail;
