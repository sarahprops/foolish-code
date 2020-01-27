"use strict";

// to do: fix babel to use this
// const Vue = require('vue');
// const axios = require('axios');

/**
 * Custom Date Sort for Articles
 *
 * takes in article api data and sorts by publish date
 *
 * @param {elem} a, b elements for comparison
 * @return {object} sorted data
 */
function sortArticlesByDate(a, b) {
  return new Date(b.publish_at).getTime() - new Date(a.publish_at).getTime();
}
/*
 * VUE
 */


new Vue({
  // so we don't fight django
  delimiters: ['[[', ']]'],
  el: '#vue-app',
  data: {
    apiArticles: null,
    isErrored: false,
    isLoading: true,
    apiArticleBureaus: []
  },

  /*
   * on mount, run our axios request
   * 
   * on response, 
   *  update our vue data obj with response data
   *    create article bureau obj with response data
   * on error, log error and throw up error flag
   * on end, turn off loading flag
   */
  mounted: function mounted() {
    var _this = this;

    axios.get('/api/articles').then(function (response) {
      // get data, sort data
      var responseData = response.data.results;
      responseData.sort(sortArticlesByDate); // set apiArtcles data to sorted data

      _this.apiArticles = responseData; // for each article, get the bureau name and add to new array

      responseData.forEach(function (articleData) {
        var bureauName = articleData.bureau.name; // only add new names

        if (!_this.apiArticleBureaus.includes(bureauName)) {
          _this.apiArticleBureaus.push(bureauName);
        } // !this.apiArticleBureaus.includes(bureauName) ? this.apiArticleBureaus.push(bureauName) : '';

      });
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
     * @param {string} date as a string
     * @return {string} formatted param data string
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
    },

    /**
     * take bureau name and convert it
     *
     * removes commas, replaces spaces with dashes, and lowercases
     *
     * @param {string} stringToConvert the strong to be converted
     * @return {string} the converted string
     */
    bureauNameConverted: function bureauNameConverted(stringToConvert) {
      return stringToConvert.replace(/,/g, "").replace(/\s+/g, '-').toLowerCase();
    },

    /**
     * actions when the bureau filter changes
     *
     * grab our dom articles and show / hide based on select value
     * limit to 5 being shown & give first 2 visible featured class
     *
     * @param {event} e event
     */
    bureauFilterChanged: function bureauFilterChanged(e) {
      // vars
      var articlesMarkup = document.querySelectorAll('.article'),
          selectedValue,
          visibleCounter;
      selectedValue = e.target.value;
      visibleCounter = 0; // for each article from the dom
      // show or hide based on selected value

      articlesMarkup.forEach(function (articleItem) {
        var articleItemBureau = articleItem.dataset.articleBureau; // only want to show 5

        if (visibleCounter >= 5) {
          articleItem.style.display = 'none';
        } else {
          // show if most recent or matches to be shown
          if (selectedValue === 'most-recent' || selectedValue === articleItemBureau) {
            // show
            articleItem.style.display = 'block'; // if its our first two add the featured article class
            // else remove, just in case

            if (visibleCounter < 2) {
              articleItem.classList.add('article-featured');
            } else {
              articleItem.classList.remove('article-featured');
            } // increase counter


            visibleCounter++;
          } else {
            articleItem.style.display = 'none';
          }
        }
      });
    }
  }
});