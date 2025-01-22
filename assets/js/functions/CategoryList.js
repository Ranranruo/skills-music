import Category from "../classes/Category.js";

class CategoryList {
  #element = document.createElement("ul");
  #data = [];
  #categorys = [];
  #notifyFunction = () => {};
  async init() {
    this.#element.classList.add("nav");
    this.#element.id = "main-menu";

    this.render();
  }

  render() {
    this.#element.innerHTML = `
    <li class="text-center">
      <div class="search">
        <div class="form-group input-group">
          <input type="text" class="form-control" placeholder="앨범검색">
          <span class="input-group-btn">
          <button class="btn btn-default" type="button"><i class="fa fa-search"></i>
          </button>
          </span>
          </div>
          </div>
          </li>`;
    this.#categorys.forEach((category) => {
      this.#element.append(category.getElement());
    });
  }

  getElement() {
    return this.#element;
  }

  getActiveCategorys() {
    const activeCategorys = this.#categorys.filter((category) =>
      category.isActive()
    );
    if (activeCategorys.length < 1) return null;
    return activeCategorys;
  }

  getActiveCategoryNames() {
    const activeCategorys = this.getActiveCategorys();
    if (activeCategorys == null) return null;
    return activeCategorys.map((category) => category.getName());
  }

  getActiveCategoryCount() {
    return this.#categorys.reduce((acc, category) => {
      return acc + (category.isActive() ? 1 : 0);
    }, 0);
  }

  getCategoryByName(name) {
    return this.#categorys.find((category) => category.getName() == name);
  }

  getCategorysByNameNot(name) {
    return this.#categorys.filter((category) => category.getName() != name)
  }

  getCategorys() {
    return this.#categorys;
  }

  addCategory(category) {
    this.#categorys.push(category);
    category.addEvent("click", this.#notifyFunction);
    this.render();
  }

  setNotifyFunction(callback) {
    this.#categorys.forEach(category => {
      const element = category.getElement();
      element.removeEventListener("click", this.#notifyFunction);
      element.addEventListener("click", () => { callback(category) });
    })
    this.#notifyFunction = callback;
  }
}

export default CategoryList;
