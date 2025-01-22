class Album {
  #element = document.createElement("div");
  #category = "";
  #jaketImage = "";
  #name = "";
  #artist = "";
  #release = "";
  #price = 0;
  init({
    category,
    albumJaketImage,
    albumName,
    artist,
    release,
    price
  } = {}) {
    this.#category = category;
    this.#jaketImage = albumJaketImage;
    this.#name = albumName;
    this.#artist = artist;
    this.#release = release;
    this.#price = price;

    this.#element.classList.add("col-md-2", "col-sm-2", "col-xs-2", "product-grid");

    this.render();
  }

  render() {
    this.#element.innerHTML = `
    <div class="product-items">
      <div class="project-eff">
        <img class="img-responsive" src="images/${this.#jaketImage}" alt="${this.#name}">
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
            <i class="fa fa-shopping-cart"></i> 추가하기 (1개) 
          </button>
        </span>
      </div>
    </div>`;
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

};

export default Album;