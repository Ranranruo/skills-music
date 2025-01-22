class Category {
  #element = document.createElement("li");
  #name;
  #active = false;
  #events = [{
    type: "click",
    callback: () => { this.toggleActive() }
  }];
  init(name) {
    this.#name = name;
    this.render();
  };
  
  render() {
    this.#element.innerHTML = `
      <a ${this.#active ? 'class="active-menu"' : ""} href="#"><i class="fa fa-th-list fa-2x"></i> <span>${this.#name}</span></a>
    `;
    this.applyEvents();
  }

  applyEvents() {
    this.#events.forEach(({type, callback}) => {
      this.#element.addEventListener(type, callback);
    })
  }

  getElement() {
    return this.#element;
  }

  getName() {
    return this.#name;
  }
  
  setActive(boolean) {
    this.#active = boolean;
    this.render();
  }
  
  toggleActive() {
    this.#active = !this.#active;
    this.render();
  }
  
  isActive() {
    return this.#active;
  }
  
  
  addEvent(type, callback) {
    this.#events = [...this.#events, {type, callback}];
    this.render();
  }
}

export default Category;