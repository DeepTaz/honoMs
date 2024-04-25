import createApi, {startApi} from "./common/index.js";
import {authRoute} from "./auth/src/routes/index.js";
import housesRoute from "./house/src/routes/index.js";

const API = createApi()

//auth services routes.
API.route("/", authRoute);

//houses services routes.
API.route("/", housesRoute)

await startApi(API, {URI: "mongodb://localhost:27017/house", PORT: 3000, HOST: " http://localhost:3000"})