class Album {
  #element = document.createElement("div");
  #idx = null;
  #category = "";
  #imageSrc = "";
  #name = "";
  #artist = "";
  #release = "";
  #price = 0;
  #cartCount = 0;
  #clickAddButtonEventFunction = () => {};
  init({
    idx,
    category,
    albumJaketImage,
    albumName,
    artist,
    release,
    price,
    cartCount
  } = {}) {
    this.#idx = idx;
    this.#category = category;
    this.#imageSrc = albumJaketImage;
    this.#name = albumName;
    this.#artist = artist;
    this.#release = release;
    this.#price = price;
    this.#cartCount = cartCount;

    this.#element.classList.add("col-md-2", "col-sm-2", "col-xs-2", "product-grid");

    this.render();
  }

  render() {
    this.#element.innerHTML = `
    <div class="product-items">
      <div class="project-eff">
        <img class="img-responsive" src="images/${this.#imageSrc}" alt="${this.#name}">
      </div>
      <div class="produ-cost">
        <h5>${this.#name}</h5>
        <span>
          <i class="fa fa-microphone"> 아티스트</i> 
          <p>${this.#artist}</p>
        </span>
        <span>
          <i class="fa fa-calendar"> 발매일</i>s 
          <p>${this.#release}</p>
        </span>
        <span>
          <i class="fa fa-money"> 가격</i>
          <p>￦${parseInt(this.#price).toLocaleString("ko-KR")}원</p>
        </span>
        <span class="shopbtn">
          <button class="btn btn-default btn-xs">
            <i class="fa fa-shopping-cart"></i> 추가하기 ${this.#cartCount ? `(${this.#cartCount}개)` : ""} 
          </button>
        </span>
      </div>
    </div>`;
    this.applyEvents();
  }

  applyEvents() {
    const addButton = this.#element.querySelector(".shopbtn > button");
    addButton.addEventListener("click", () => this.#clickAddButtonEventFunction(this));
  }

  getIdx() {
    return this.#idx;
  }

  getElement() {
    return this.#element;
  }
  
  getCategory() {
    return this.#category;
  }

  getRelease() {
    return this.#release;
  }

  getCartCount() {
    return this.#cartCount;
  }
  
  setCartCount(cartCount) {
    this.#cartCount = cartCount;
    this.render();
  }
  increaseCartCount() {
    this.#cartCount = this.#cartCount + 1;
    this.render();
  }
  decreaseCartCount() {
    this.#cartCount = this.#cartCount--;
    if(this.#cartCount < 0) this.#cartCount = 0;
    this.render();
  }
  setClickAddButtonEventFunction(clickAddButtonEventFunction) {
    this.#clickAddButtonEventFunction = clickAddButtonEventFunction;
    this.render();
  }
};

export default Album;