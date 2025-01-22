class Search {
  #element = document.querySelector(".search > .form-group");
  #input = this.#element.querySelector("input");
  #button = this.#element.querySelector("button");
  #query = "";
  #searchEventFunction = () => {};
  #inputEventFunction = () => {};

  init(query) {
    this.#query = query;

    this.#input.addEventListener("input", (event) => this.setQuery(this.#input.value));
    this.#input.addEventListener("input", this.#inputEventFunction);

    this.#input.addEventListener("keyup", this.checkPressEnter);
    this.#button.addEventListener("click", this.#searchEventFunction);

    this.render();
  }

  checkPressEnter = (event) => { if(event.code == "Enter") { this.#searchEventFunction() } }

  render() {
    const input = this.#element.querySelector("input");
    input.value = this.#query;
  }

  setInputEventFunction(inputEventFunction) {
    this.#input.removeEventListener("input", this.#inputEventFunction);
    this.#inputEventFunction = inputEventFunction;
    this.#input.addEventListener("input", this.#inputEventFunction);
  }

  setSearchEventFunction(searchEventFunction) {
    this.#input.removeEventListener("keyup", this.checkPressEnter);
    this.#button.removeEventListener("click", this.#searchEventFunction);

    this.#searchEventFunction = searchEventFunction;

    this.#input.addEventListener("keyup", this.checkPressEnter);
    this.#button.addEventListener("click", this.#searchEventFunction);
  }

  getQuery() {
    return this.#query;
  }

  setQuery(query) {
    this.#query = query;
    this.render();
  }
}

export default Search;