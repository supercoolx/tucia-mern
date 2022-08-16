import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class OrderServices extends GenericService {
  constructor() {
    super();
  }

  getFinalOrder = () => this.get("storage/allorder/finalorder");
  // getFiles = (id) => this.get("allfiles/" + id);
  getFilesAndDownload = (id) => this.get("storage/allfilesDownload/" + id);
  getFilesAndDownloadtemp = (id) =>
    this.get("todown/567470fd1e7311c6163d6dfc87df8400.mp4");
  delOrder = (id) => this.get("storage/delete/finalorder/" + id);
}

let orderServices = new OrderServices();
export default orderServices;
