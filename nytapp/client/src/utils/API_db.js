import axios from "axios";

export default {
  // Gets all books
  getSavedArticles: function() {
    console.log("im in getSavedArticles");
    const response = axios.get("/api/articles");
    console.log(response);
    return response;
  },
  // Deletes the book with the given id
  deleteSavedArticle: function(id) {
    return axios.delete("/api/article/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};