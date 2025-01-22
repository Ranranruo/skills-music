class MusicAPI {
  #data = null;
  #refreshRate = 10000;
  #refreshedTime = 0;

  async init() {
    await this.fetchData();
  }
  
  async fetchData() {
    // 데이터 받아와서 #data에 저장
    const response = await fetch("music_data.json");
    const json = await response.json();
    this.#data = json.data;
  }

  async refresh() {
    // #refreshedTime 에 현재 시간을 타임스탬프로 저장 후 fetchData 메서드 실행
    this.#refreshedTime = Date.now();
    await this.fetchData();
  }

  async refreshCheck() {
    const now = Date.now();
    // 데이터를 받아온지 #refreshRate 만큼 시간이 지났다면 refresh 메서드 실행
    if(now > this.#refreshedTime + this.#refreshRate)
      await this.refresh();
  }

  async findAll() {
    await this.refreshCheck();
    return this.#data;
  }

  async findDistinctCategory() {
    await this.refreshCheck();
    return [...new Set(this.#data.map(data => data.category))];
  }
}

export default MusicAPI;