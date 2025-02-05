class Cart {
  #element = document.querySelector("#myModal");
  #cartAlbums = [];
  #totalPrice;
  #closeButton = this.#element.querySelector(".modal-footer > .btn.btn-default");
  #openButton = document.querySelector(".btn.btn-primary.btn-lg");
  #open = false;
  init() {
    this.render();
    this.#closeButton.addEventListener("click", () => this.close());
    this.#openButton.addEventListener("click", () => this.open());
  }
  render() {
    const cartAlbumContainer = this.#element.querySelector("tbody");
    cartAlbumContainer.innerHTML = "";
    
    this.#cartAlbums.forEach(cartAlbum => {
      this.#element.querySelector("tbody").append(cartAlbum.getElement());
    })
    const openNum = this.#open ? 1 : 0;
    this.#element.classList.replace(["show", "fade"][openNum], ["fade", "show"][openNum])
  }

  addCartAlbum(cartAlbum) {
    this.#cartAlbums.push(cartAlbum);
    this.render();
  }
  setCartAlbums(cartAlbums) {
    this.#cartAlbums = cartAlbums;
  }

  open() {
    this.#open = true;
    this.render();
  }
  close() {
    this.#open = false;
    this.render();
  }
}

export default Cart;