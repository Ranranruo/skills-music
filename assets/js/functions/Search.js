class Search {
  #element = document.querySelector(".search > .form-group");
  #query = "";
  #searchEventFunction = () => {};

  init(query) {
    this.#query = query;
    
    this.render();
  }

  render() {
    const input = this.#element.querySelector("input");
    input.value = this.#query;
  }

  setSearchEventFunction(searchEventFunction) {

  }
}

export default Search;