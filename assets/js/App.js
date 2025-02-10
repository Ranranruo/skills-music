import Album from "./classes/Album.js";
import Category from "./classes/Category.js";
import CartAlbum from "./classes/CartAlbum.js";

import AlbumList from "./functions/AlbumList.js";
import CategoryList from "./functions/CategoryList.js";
import Search from "./functions/Search.js";
import Cart from "./functions/Cart.js";

import UserHistoryAPI from "./apis/UserHistoryAPI.js";
import MusicAPI from "./apis/MusicAPI.js";

class App {
  // element
  #element;
  // apis
  #musicAPI;
  #userHistoryAPI;
  // functions
  #albumList;
  #categoryList;
  #search;
  #cart;

  async init() {
    this.#element = document.querySelector("body");

    this.#userHistoryAPI = new UserHistoryAPI();
    this.#userHistoryAPI.init();

    this.#musicAPI = new MusicAPI();
    await this.#musicAPI.init();

    await this.albumList();
    await this.categoryList();
    this.search();
    await this.cart();
  }

  async albumList() {
    // albumList
    this.#albumList = new AlbumList();
    await this.#albumList.init();
    this.#albumList.setDateOrder("desc");

    const albumsData = await this.#musicAPI.findAll();

    const userCart = this.#userHistoryAPI.getCart();
    albumsData.forEach((data) => {
      const album = new Album();
      const cartCount = userCart.find((cart) => cart.idx == data.idx);
      album.init({
        ...data,
        cartCount: cartCount?.count ?? 0,
      });
      this.#albumList.addAlbum(album);
    });
    const albums = this.#albumList.getAlbums();
    albums.forEach((album) => {
      album.setClickAddButtonEventFunction((album) => {
        album.increaseCartCount();
        const cartCount = albums.reduce((acc, album) => {
          if (album.getCartCount() <= 0) return acc;
          return [
            ...acc,
            {
              idx: album.getIdx(),
              count: album.getCartCount(),
            },
          ];
        }, []);
        this.#userHistoryAPI.setCart(cartCount);
      });
    });

    // data

    const albumListContainer = this.#element.querySelector(
      "#page-inner > .row:nth-of-type(2)"
    );
    albumListContainer.innerHTML = "";
    albumListContainer.append(this.#albumList.getElement());

    // localstorage 에서 앨범 카테고리 데이터 가져와서 적용
    const activeCategoryNames = this.#userHistoryAPI.getActiveCategoryNames();
    this.#albumList.setActiveCategoryNames(
      activeCategoryNames == "ALL" ? "*" : activeCategoryNames
    );
  }

  async categoryList() {
    // categoryList
    this.#categoryList = new CategoryList();
    await this.#categoryList.init();
    const categoryList = this.#categoryList;

    const allCategory = new Category();
    allCategory.init("ALL");
    // allCategory.setActive(true);
    categoryList.addCategory(allCategory);

    // 카테고리 이름 중복되지 않게 가져오기
    const categoryNames = await this.#musicAPI.findDistinctCategory();

    // 카테고리 생성해서 등록
    categoryNames.forEach((name) => {
      const category = new Category();
      category.init(name);
      categoryList.addCategory(category);
    });

    // localstorage 에서 카테고리 데이터 가져와서 적용
    categoryList.getCategorys().forEach((category) => {
      const activeCategoryNames = this.#userHistoryAPI.getActiveCategoryNames();
      if (activeCategoryNames.includes(category.getName()))
        category.setActive(true);
    });

    // 카테고리중 하나가 클릭되었을때 실행될 함수
    categoryList.setNotifyFunction((category) => {
      const allCategory = categoryList.getCategoryByName("ALL");
      const allCategoryName = allCategory.getName();

      if (category.getName() == allCategoryName) {
        categoryList
          .getActiveCategorys(allCategoryName)
          ?.forEach((category) => category.setActive(false));
        allCategory.setActive(true);
      } else allCategory.setActive(false);
      if (categoryList.getActiveCategoryCount() < 1)
        allCategory.setActive(true);

      this.#albumList.setActiveCategoryNames(
        categoryList.getActiveCategoryNames() == "ALL"
          ? "*"
          : categoryList.getActiveCategoryNames()
      );

      this.#userHistoryAPI.setActiveCategoryNames(
        categoryList.getActiveCategoryNames()
      );
    });

    const categoryListContainer =
      this.#element.querySelector(".sidebar-collapse");
    categoryListContainer.innerHTML = "";
    categoryListContainer.append(categoryList.getElement());
  }

  search() {
    const query = this.#userHistoryAPI.getQuery();

    this.#search = new Search();
    this.#search.init(query);

    this.#search.setInputEventFunction((event) => {
      this.#userHistoryAPI.setQuery(this.#search.getQuery());
    });
  }

  async cart() {
    this.#cart = new Cart();
    this.#cart.init();

    this.#userHistoryAPI.setCartNotifyFunction(async () => {
      const cart = this.#cart;
      const cartData = this.#userHistoryAPI.getCart();
      const cartIdxs = cartData.map((data) => data.idx);
      const cartAlbumsData = await this.#musicAPI.findAllByIdxs(cartIdxs);

      const cartAlbums = cartAlbumsData.map((cartAlbumData) => {
        const cartAlbum = new CartAlbum();
        cartAlbum.init({
          ...cartAlbumData,
          count: cartData.find((data) => data.idx == cartAlbumData.idx).count,
        });

        return cartAlbum;
      });
      cart.setCartAlbums(cartAlbums);
    });
  }
}

export default App;
