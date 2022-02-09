class APIHandler {
  constructor() {
    this.axiosApp = axios.create({
      baseURL: "https://minions-api.herokuapp.com/",
    });
  }

  getFullList() {
    return this.axiosApp.get("/characters");
  }

  getOneRegister(characterId) {
    return this.axiosApp.get(`/characters/${characterId}`);
  }

  createOneRegister(characterInfo) {
    return this.axiosApp.post("/characters", characterInfo);
  }

  updateOneRegister(characterId, characterInfo) {
    return this.axiosApp.put(`/characters/${characterId}`, characterInfo);
  }

  deleteOneRegister(characterId, characterInfo) {
    return this.axiosApp.delete(`/characters/${characterId}`, characterInfo);
  }
}
