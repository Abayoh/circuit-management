class TokenService {
    getLocalRefreshToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.refreshToken;
    }
  
    getLocalAccessToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.accessToken;
    }
  
    updateLocalAccessToken(token) {
      let user = JSON.parse(localStorage.getItem("user"));
      user.accessToken = token;
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    }
  
    setUser(user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    removeUser() {
      localStorage.removeItem("user");
    }

    setUserInfoOnReload(user){
      localStorage.setItem("userInfo", JSON.stringify(user))
    }
    
    getUserInfoBeforeReload(){
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      localStorage.removeItem("userInfo");
      return userInfo;
    }
}
  
  export default new TokenService();