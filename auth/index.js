import authApi from "./src/index.js";
import {AUTH} from "./src/common/constant.js";
import {startApi} from "../common/index.js";

await startApi(authApi, AUTH)