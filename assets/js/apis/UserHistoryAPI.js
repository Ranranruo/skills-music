class UserHistoryAPI {
  activeCategoryNames = null;
  query = "";

  async init() {
    this.fetchData();
    this.saveData();
  }

  fetchData() {
    const userHistory = JSON.parse(localStorage.getItem("userHistory"));
    this.activeCategoryNames = userHistory?.activeCategoryNames ?? ["ALL"];
    this.query = userHistory?.query ?? "";
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
  }
}

export default UserHistoryAPI;