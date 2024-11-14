import authHeader from "./auth-header";

const API_URL = "https://ferretodo.onrender.com/";

class UserService {
  getPublicContent() {
    return fetch(API_URL);
  }

  getUserBoard() {
    return fetch(API_URL + "user", { headers: authHeader() });
  }

  getAdminBoard() {
    return fetch(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
