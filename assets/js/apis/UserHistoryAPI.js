class UserHistoryAPI {
  activeCategoryNames = null;
  query = "";
  cart = [];
  #cartNotifyFunction = [()=>{}];
  async init() {
    this.fetchData();
    this.saveData();
  }

  async fetchData() {
    const userHistory = JSON.parse(localStorage.getItem("userHistory"));
    this.activeCategoryNames = userHistory?.activeCategoryNames ?? ["ALL"];
    this.query = userHistory?.query ?? "";
    this.cart = userHistory?.cart ?? [];
    
    await this.#cartNotifyFunction.forEach(async(func) => await func());
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
    this.#cartNotifyFunction.forEach(func => func());
  }

  setCartCountByIdx(idx, count) {
    this.cart = this.cart.map(cartCount => {
      if(cartCount.idx == idx)
        cartCount.count = count;
      return cartCount;
    })
    this.saveData();
    this.#cartNotifyFunction.forEach(func => func());
  }

  removeCartCountByIdx(idx) {
    this.cart = this.cart.filter(cartCount => cartCount.idx != idx);
    console.log(idx);
    this.saveData();
    this.#cartNotifyFunction.forEach(func => func());
  }
  
  async setCartNotifyFunction(cartNotifyFunction) {
    await cartNotifyFunction();
    this.#cartNotifyFunction = cartNotifyFunction;
  }
  async addCartNotifyFunction(cartNotifyFunction) {
    await cartNotifyFunction();
    this.#cartNotifyFunction.push(cartNotifyFunction);
  }
}

export default UserHistoryAPI;