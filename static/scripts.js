"use strict";

new Vue({
  el: '#vue-app',
  delimiters: ['[[', ']]'],
  data: function data() {
    return {
      apiArticles: null,
      isErrored: false,
      isLoading: true
    };
  },
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
  }
});