import axios from "axios";

export default {
  // Gets all books
  getSavedArticles: function() {
    console.log("im in getSavedArticles");
    return axios.get("/api/articles");
  },
  // Deletes the book with the given id
  deleteSavedArticle: function(id) {
    console.log("im in deleteSavedArticle");
    return axios.delete("/api/article/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    console.log("im in saveArticle");
    return axios.post("/api/article", articleData);
  }
};