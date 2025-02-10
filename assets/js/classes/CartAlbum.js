class CartAlbum {
  #element = document.createElement("tr")
  #idx = null;
  #imageSrc = "";
  #name = "";
  #artist = "";
  #release = "";
  #price = 0;
  #total = 0;
  #count = "0원";
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
    console.log(this)
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
  }
  
  applyEvents() {

  }

  getElement() {
    return this.#element;
  }

  setDeleteEventFunction(deleteEventFunction) {
    this.#deleteEventFunction = deleteEventFunction;
  }


}

export default CartAlbum;