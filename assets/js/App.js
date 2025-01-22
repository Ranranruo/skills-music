import Album from "./classes/Album.js";
import Category from "./classes/Category.js";

import AlbumList from "./functions/AlbumList.js";
import CategoryList from "./functions/CategoryList.js";
import Search from "./functions/Search.js";

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

  async init() {
    this.#element = document.querySelector("body");

    this.#userHistoryAPI = new UserHistoryAPI();
    this.#userHistoryAPI.init();

    this.#musicAPI = new MusicAPI();
    await this.#musicAPI.init();

    await this.albumList();
    await this.categoryList();
    this.search();
  }

  async albumList() {
    // albumList
    this.#albumList = new AlbumList();
    await this.#albumList.init();

    const albums = await this.#musicAPI.findAll();
    
    albums.forEach(data => {
      const album = new Album()
      album.init(data);
      this.#albumList.addAlbum(album)
    })
    // data 

    const albumListContainer = this.#element.querySelector("#page-inner > .row:nth-of-type(2)");
    albumListContainer.innerHTML = "";
    albumListContainer.append(this.#albumList.getElement());

    // localstorage 에서 앨범 카테고리 데이터 가져와서 적용
    const activeCategoryNames = this.#userHistoryAPI.getActiveCategoryNames();
    this.#albumList.setActiveCategoryNames(activeCategoryNames == "ALL" ? "*" : activeCategoryNames);
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
    categoryNames.forEach(name => {
      const category = new Category();
      category.init(name);
      categoryList.addCategory(category);
    })
  
    // localstorage 에서 카테고리 데이터 가져와서 적용
    categoryList.getCategorys().forEach((category) => {
      const activeCategoryNames = this.#userHistoryAPI.getActiveCategoryNames();
      if(activeCategoryNames.includes(category.getName())) category.setActive(true);
    })
    
    // 카테고리중 하나가 클릭되었을때 실행될 함수
    categoryList.setNotifyFunction((category) => {
      const allCategory = categoryList.getCategoryByName("ALL");
      const allCategoryName = allCategory.getName();

      if(category.getName() == allCategoryName) {
        categoryList.getActiveCategorys(allCategoryName)?.forEach((category) => category.setActive(false));
        allCategory.setActive(true);
      }
      else allCategory.setActive(false);
      if(categoryList.getActiveCategoryCount() < 1) allCategory.setActive(true);

      this.#albumList.setActiveCategoryNames(
        categoryList.getActiveCategoryNames() == "ALL" ? "*" : categoryList.getActiveCategoryNames()
        );

      this.#userHistoryAPI.setActiveCategoryNames(categoryList.getActiveCategoryNames());
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
}

export default App;
