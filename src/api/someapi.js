import axios from "axios";

export default axios.create({
  REACT_APP_BASE_URL: "http://localhost:2000",
});
