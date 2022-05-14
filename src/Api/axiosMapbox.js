import axios from "axios";
import { TOKEN, TOKEN_BY_CLASS } from "../Untilities/config";

const axiosMapbox = axios.create({
    baseURL: "https://api.mapbox.com", 
    headers: {
        "Content-Type": "application/json",
        tokenByClass: TOKEN_BY_CLASS,
        token: localStorage.getItem(TOKEN),
    }
})

export default axiosMapbox;