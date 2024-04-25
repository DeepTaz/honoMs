import {authRoute} from "./routes/index.js";
import createApi from "../../common/index.js";

const authApi = createApi()

authApi.route("/", authRoute)

export default authApi