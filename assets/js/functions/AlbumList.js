class AlbumList {
  #element = document.createElement("div");
  #albums = [];
  #activeCategoryNames = "*";
  #dateOrder = null;
  async init() {
    this.#element.classList.add("contents", "col-md-12");

    this.render();
  }

  render() {
    let albums = this.#albums;
    this.#element.innerHTML = "";

    if(this.#activeCategoryNames != "*") albums = this.#categoryFilter(albums);
    if(this.#dateOrder != null) albums = this.#orderByDate(albums);
    albums.forEach((album) => {
      this.#element.append(album.getElement());
    });
  }
  
  #categoryFilter(albums) {
    return albums.filter((album) => this.#activeCategoryNames.includes(album.getCategory()));
  }

  #orderByDate(albums) {
    if(!(this.#dateOrder === "asc" || this.#dateOrder === "desc")) return albums;
    const sortNum = this.#dateOrder === "asc" ? 1 : -1;
    return albums.toSorted((aAlbum, bAlbum) => {
      return (new Date(bAlbum.getRelease()) - new Date(aAlbum.getRelease())) * sortNum;
    });
  }

  getElement() {
    return this.#element;
  }

  addAlbum(album) {
    this.#albums.push(album);
    this.render();
  }
  
  setActiveCategoryNames(activeCategoryNames) {
    this.#activeCategoryNames = activeCategoryNames;
    this.render();
  }

  setDateOrder(dateOrder) {

  }
}
export default AlbumList;
