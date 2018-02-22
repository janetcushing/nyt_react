import axios from "axios";

// const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
// const APIKEY = "apikey=c0b4d2e16a014795bbdce9d7e4df8a95";
// const QUERY = "&q=obama";

// export default {
//   search: function(query) {
//     return axios.get(BASEURL + APIKEY + QUERY);
//   }
// };

// const axios = require("axios");
const url =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?apikey=c0b4d2e16a014795bbdce9d7e4df8a95&q=obama";

  const API = props => {
axios
  .get(url)
  .then(response => {
    console.log(
      `web_url: ${response.data.results[0].web_url} -`,
      `snippet: ${response.data.results[0].snippet} -`,
      `date_pub: ${response.data.results[0].date_pub} -`,
      `All: ${response.data.results[0]}`
    );
  })
  .catch(error => {
    console.log(error);
  });

// const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" ;

// const APIKEY = "api-key=c0b4d2e16a014795bbdce9d7e4df8a95";
// const KEY = "c0b4d2e16a014795bbdce9d7e4df8a95";
// const urlQuery = "&q=obama"

// var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  // KEY + "&q=obama";

// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += "" +
//   'api-key': "c0b4d2e16a014795bbdce9d7e4df8a95",
//   'q': "obama",
//   'begin_date': "20180101",
//   'end_date': "20180131"
// });
// const API = props =>
    // console.log(BASEURL + urlQuery + APIKEY);
    // return axios.get(BASEURL + urlQuery + APIKEY);
        // console.log(queryURLBase);
    // axios.get(queryURLBase)  
    // .then(function(arr){
      // return {
        // results: arr[0].data,
      // }
    // })
  }
    export default API;
  



