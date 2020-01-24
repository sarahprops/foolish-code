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

new Vue({
  // so we don't fight django
  delimiters: ['[[', ']]'],
  el: '#vue-app',
  data: {
    apiArticles: null,
    isErrored: false,
    isLoading: true,
    apiArticleBureaus: [],
    selected: '',
  },
  /*
  * on mount, run our axios request
  * 
  * on response, update our vue data obj with response data
  * on error, log error and throw up error flag
  * on end, turn off loading flag
  */
  mounted: function() {
    axios
      .get('/api/articles')
      .then(response => {
      	// get data, sort data
      	let responseData = response.data.results;
        responseData.sort(sortArticlesByDate);

        // set apiArtcles data to sorted data
        this.apiArticles = responseData;

        // for each article, get the bureau name and add to new array
        responseData.forEach((articleData) => {
	  			let bureauName = articleData.bureau.name;

	  			// only add new names
	  			if(!this.apiArticleBureaus.includes(bureauName)) {
	  				this.apiArticleBureaus.push(bureauName);
	  			}
	  			// !this.apiArticleBureaus.includes(bureauName) ? this.apiArticleBureaus.push(bureauName) : '';
	  		});

      })
      .catch(error => {
        console.log(error)
        this.isErrored = true;
      })
      .finally(() => this.isLoading = false);
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
    convertDate: function(dateToConvert) {
      let formattedDate = new Date(Date.parse(dateToConvert));
      dateToConvert = formattedDate.toLocaleString();
      return dateToConvert;
    },
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
    makeFirstImageBackground: function(apiArticleContext) { 
    	let url = apiArticleContext.images[0].url;
      return `background-image: url('${url}')`; 
    },

    /**
		 * take bureau name and convert it
		 *
		 * removes commas, replaces spaces with dashes, and lowercases
		 *
		 * @param {string} the strong to be converted
		 * @return {string} the converted string
		 */
    bureauNameConverted: function(stringToConvert) {
    	return stringToConvert.replace(/,/g,"").replace(/\s+/g, '-').toLowerCase();
    },

    bureauFilterChanged: function(e) {
  		
  	}
  }
});