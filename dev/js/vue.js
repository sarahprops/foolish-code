new Vue({
  el: '#vue-app',
  delimiters: ['[[', ']]'],
  data() {
    return {
      apiArticles: null,
      isErrored: false,
      isLoading: true
    }
  },
  mounted() {
    axios
      .get('/api/articles')
      .then(response => {
      	console.log(response.data.results);
        this.apiArticles = response.data.results;
      })
      .catch(error => {
        console.log(error)
        this.isErrored = true;
      })
      .finally(() => this.isLoading = false);
  }
});