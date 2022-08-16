import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class CategoryService extends GenericService {
  constructor() {
    super();
  }

  PostFinalOrder = (C_id, files_id, data) =>
    this.post("order/finalorder/" + C_id + "/" + files_id, data);
}

let categoryService = new CategoryService();
export default categoryService;
