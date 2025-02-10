class CartAlbum {
  #element = document.createElement("tr")
  #idx = null;
  #imageSrc = "";
  #name = "";
  #artist = "";
  #release = "";
  #price = "0원";
  #total = 0;
  #count = 0;
  #deleteEventFunction = () => {};
  #changeCountEventFunction = () => {};
  init({
    idx,
    albumJaketImage,
    albumName,
    artist,
    release,
    price,
    count
  } = {}) {
    this.#idx = idx;
    this.#imageSrc = albumJaketImage;
    this.#name = albumName;
    this.#artist = artist;
    this.#release = release;
    this.#price = price;
    this.#count = count;
    this.render();
  }
  render() {
    this.#element.innerHTML = `
    <td class="albuminfo">
      <img src="images/${this.#imageSrc}">
      <div class="info">
        <h4>${this.#name}</h4>
        <span>
          <i class="fa fa-microphone"> 아티스트</i> 
          <p>${this.#artist}</p>
        </span>
        <span>
          <i class="fa  fa-calendar"> 발매일</i> 
          <p>${this.#release}</p>
        </span>
      </div>
    </td>
    <td class="albumprice">
      ￦ ${parseInt(this.#price).toLocaleString("ko-KR")}
    </td>
    <td class="albumqty">
        <input type="number" class="form-control" value="${this.#count}">
    </td>
    <td class="pricesum">
      ￦ ${(parseInt(this.#price) * this.#count).toLocaleString("ko-KR")}
    </td>
    <td>
      <button class="btn btn-default">
        <i class="fa fa-trash-o"></i> 삭제
      </button>
    </td>`;
    this.applyEvents();
  }
  
  applyEvents() {
    const deleteButton = this.#element.querySelector("button");
    const countInput = this.#element.querySelector("input");

    deleteButton.addEventListener("click", () => { this.#deleteEventFunction(this) });
    countInput.addEventListener("change", () => { this.#changeCountEventFunction(this) })
  }

  getElement() {
    return this.#element;
  }

  getIdx() {
    return this.#idx;
  }

  getPrice() {
    return this.#price;
  }

  getCount() {
    return this.#count
  }

  setCount(count) {
    this.#count = count;
    this.render();
  }

  setDeleteEventFunction(deleteEventFunction) {
    this.#deleteEventFunction = deleteEventFunction;
    this.render();
  }

  setChangeCountEventFunction(changeCountEventFunction) {
    this.#changeCountEventFunction = changeCountEventFunction;
    this.render();
  }

}

export default CartAlbum;