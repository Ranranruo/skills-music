class AlbumList {
  #element = document.createElement("div");
  #albums = [];
  #activeCategoryNames = "*";
  async init() {
    this.#element.classList.add("contents", "col-md-12");

    this.render();
  }

  render() {
    let albums = this.#albums;
    this.#element.innerHTML = "";

    if(this.#activeCategoryNames != "*") albums = this.#categoryFilter(albums);
    albums.forEach((album) => {
      this.#element.append(album.getElement());
    });
  }
  
  #categoryFilter(albums) {
    return albums.filter((album) => this.#activeCategoryNames.includes(album.getCategory()));
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
}
export default AlbumList;
