"use strict";

// const Vue = require('vue');
// const axios = require('axios');
new Vue({
  // so we don't fight django
  delimiters: ['[[', ']]'],
  el: '#vue-app',
  data: {
    apiArticles: null,
    isErrored: false,
    isLoading: true
  },

  /*
  * on mount, run our axios request
  * 
  * on response, update our vue data obj with response data
  * on error, log error and throw up error flag
  * on end, turn off loading flag
  */
  mounted: function mounted() {
    var _this = this;

    axios.get('/api/articles').then(function (response) {
      console.log(response.data.results);
      _this.apiArticles = response.data.results;
    })["catch"](function (error) {
      console.log(error);
      _this.isErrored = true;
    })["finally"](function () {
      return _this.isLoading = false;
    });
  },
  filters: {
    /**
    * Convert date
    *
    * takes in a date string and formats it to a readable date
    *
    * @param {string} takes in a date as a string
    * @return {string} 
    */
    convertDate: function convertDate(dateToConvert) {
      var formattedDate = new Date(Date.parse(dateToConvert));
      dateToConvert = formattedDate.toLocaleString();
      return dateToConvert;
    }
  },
  methods: {
    /**
    * get the first background image and set it as background
    *
    * for article previews, only show the first image from images json data
    * then set that as a background image
    *
    * @param {obj} the article context passed from the template
    * @return {string} the background image text with url of image 
    */
    makeFirstImageBackground: function makeFirstImageBackground(apiArticleContext) {
      var url = apiArticleContext.images[0].url;
      return "background-image: url('".concat(url, "')");
    }
  }
});