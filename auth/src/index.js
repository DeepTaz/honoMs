import {routes} from "./routes/index.js";
import createApi from "../../common/index.js";

const authApi = createApi()

authApi.route("/", routes)

export default authApi