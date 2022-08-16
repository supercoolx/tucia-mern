import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class FaqService extends GenericService {
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

  PostNewTopic = (data) => this.post("faq/newTopic", data);
  PostNewFAQ = (data) => this.post("faq/newFAQ", data);
  GetAllTopic = () => this.get("faq/allTopicsArray");
  GetAllTopicDesc = () => this.get("faq/getAllTopics");
  GetAllArticles = (id) => this.get("faq/getAllArticles/" + id);
}

let faqService = new FaqService();
export default faqService;
