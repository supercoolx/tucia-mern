import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class UserService extends GenericService {
  constructor() {
    super();
  }

  UserLogin = (data) =>
    new Promise((resolve, reject) => {
      this.post("users/login", data)
        .then((res) => {
          resolve(res.token);
          localStorage.setItem("token", res.token);
        })
        .catch((err) => {
          //console.log("in try of user login");
          reject(err.response.data);
        });
    });

  isLoggedin = () => {
    if (
      localStorage.getItem("token") ||
      localStorage.getItem("google") ||
      localStorage.getItem("facebook")
    ) {
      return true;
    } else {
      return false;
    }
  };
  logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");

      return true;
    } else if (localStorage.getItem("google")) {
      localStorage.removeItem("google");
    } else if (localStorage.getItem("facebook")) {
      localStorage.removeItem("facebook");
    } else {
      return false;
    }
  };
  getloggedinuser = () => {
    try {
      if (localStorage.getItem("token")) {
        const jwt = localStorage.getItem("token");
        // console.log("getLoggedinData");
        // console.log(jwtDecode(jwt));
        return jwtDecode(jwt);
      } else if (localStorage.getItem("google")) {
        const g = localStorage.getItem("google");
        var test = JSON.parse(g);
        return test;
      } else if (localStorage.getItem("facebook")) {
        const g = localStorage.getItem("facebook");
        var test = JSON.parse(g);
        return test;
      } else {
        return null;
      }
    } catch (ex) {
      return null;
    }
  };
  isAdmin = () => {
    if (this.isLoggedin()) {
      if (this.getloggedinuser().role == true) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
  loggedInId = () => {
    if (localStorage.getItem("token")) {
      return this.getloggedinuser()._id;
    } else if (localStorage.getItem("google")) {
      const g = localStorage.getItem("google");
      var test = JSON.parse(g);
      return test.googleId;
    } else if (localStorage.getItem("facebook")) {
      const g = localStorage.getItem("facebook");
      var test = JSON.parse(g);
      return test.id;
    }
  };

  UserReg = (data) => this.post("users/register", data);
  UserSocialLogin = (data) => this.post("users/login/social", data);
  getUserOrders = (id) => this.get("storage/allorder/user/" + id);
  getAllUsers = () => this.get("users/allusers");
  updateUser = (data) => this.post("users/update", data);

  getUserDetails = (id) => this.get("users/details/" + id);
  updateUserDetails = (id, data) => this.post("users/details/" + id, data);
  forgetPassword = (data) => this.post("forgetPassword", data);
  forgetPasswordTemplate = (id, key) =>
    this.get("users/confirmEmail/" + id + "/" + key);

  // UserReg = (data) =>
  //   new Promise((resolve, reject) => {
  //     this.postReg("users/register", data)
  //       .then((res) => {
  //         resolve();
  //       })
  //       .catch((err) => {
  //         //console.log("in try of user login");
  //         reject(err);
  //       });
  //   });
}

let userService = new UserService();
export default userService;
