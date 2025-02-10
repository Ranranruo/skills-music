class Cart {
  #element = document.querySelector("#myModal");
  #cartAlbums = [];
  #closeButton = this.#element.querySelector(".modal-footer > .btn.btn-default");
  #openButton = document.querySelector(".btn.btn-primary.btn-lg");
  #open = false;
  init() {
    this.render();
    this.#closeButton.addEventListener("click", () => this.close());
    this.#openButton.addEventListener("click", () => this.open());
  }
  render() {
    const totalSpan = document.querySelector(".totalprice span");
    const totalButton = document.querySelector(".btn.btn-primary.btn-lg")
    const total = "₩ " + (this.#cartAlbums.reduce((acc, cartAlbum) => {
      const cartAlbumTotalPrice = parseInt(cartAlbum.getPrice()) * cartAlbum.getCount();
      return acc + cartAlbumTotalPrice;
    }, 0)).toLocaleString("ko-KR");
    totalSpan.innerText = total;
    totalButton.innerHTML = `<i class="fa fa-shopping-cart"></i> 쇼핑카트 <strong>${this.#cartAlbums.length}</strong> 개 금액 ${total}원</a>`;
    const cartAlbumContainer = this.#element.querySelector("tbody");
    cartAlbumContainer.innerHTML = "";
    this.#cartAlbums.forEach(cartAlbum => {
      this.#element.querySelector("tbody").append(cartAlbum.getElement());
    })
    const openNum = this.#open ? 1 : 0;
    this.#element.classList.replace(["show", "fade"][openNum], ["fade", "show"][openNum])
  }

  getCartAlbums() {
    return this.#cartAlbums;
  }

  addCartAlbum(cartAlbum) {
    this.#cartAlbums.push(cartAlbum);
    this.render();
  }

  removeCartAlbum(removeCartAlbum) {
    this.#cartAlbums = this.#cartAlbums.filter(cartAlbum => cartAlbum.getIdx() != removeCartAlbum.getIdx());
    console.log(this.#cartAlbums.filter(cartAlbum => cartAlbum.getIdx() != removeCartAlbum.getIdx()));
    this.render();
  }

  setCartAlbums(cartAlbums) {
    this.#cartAlbums = cartAlbums;
    this.render();
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