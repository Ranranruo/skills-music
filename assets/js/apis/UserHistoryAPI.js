class UserHistoryAPI {
  activeCategoryNames = null;
  query = "";
  cart = [];
  #cartNotifyFunction = async () => {};
  async init() {
    this.fetchData();
    this.saveData();
  }

  async fetchData() {
    const userHistory = JSON.parse(localStorage.getItem("userHistory"));
    this.activeCategoryNames = userHistory?.activeCategoryNames ?? ["ALL"];
    this.query = userHistory?.query ?? "";
    this.cart = userHistory?.cart ?? [];
    
    await this.#cartNotifyFunction();
  }

  saveData() {
    localStorage.setItem("userHistory", JSON.stringify(this));
  }

  getActiveCategoryNames() {
    return this.activeCategoryNames;
  }

  setActiveCategoryNames(activeCategoryNames) {
    this.activeCategoryNames = activeCategoryNames;
    this.saveData();
  } 

  getQuery() {
    return this.query;
  }

  setQuery(query) {
    this.query = query;
    this.saveData();
  }

  getCart() {
    return this.cart;
  }

  setCart(cart) {
    this.cart = cart;
    this.saveData();
    this.#cartNotifyFunction();
  }

  async setCartNotifyFunction(cartNotifyFunction) {
    await cartNotifyFunction();
    this.#cartNotifyFunction = cartNotifyFunction;
  }
}

export default UserHistoryAPI;