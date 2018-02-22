import React from "react";


const ArticleDetail = props => (
  <div className="text-center">
   <h3>
   <a href={props.web_url}>Title: {props.title}</a>
    </h3>
    <p>
      Snippet: {props.snippet}
    </p>
    <p>
      Date Published: {props.pub_date}
    </p>
  </div>
);
console.log('ArticleDetail');
console.log(ArticleDetail);
export default ArticleDetail;
