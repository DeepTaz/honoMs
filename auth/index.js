import {serve} from "@hono/node-server";
import {mongoose} from "../db/index.js";
import authApi from "./src/index.js";
import {AUTH} from "./src/common/constant.js";

mongoose.connect(AUTH.URI).then(_ => {
    serve({
        fetch: authApi.fetch,
        port: AUTH.PORT,
    }, (addressInfo) => console.log(`server successfully start ${AUTH.HOST} and run on port=${addressInfo.port}`))
}).catch(_ => {
    console.error(`Unable to start the server cause can't connect to db.`)
    process.exit(1)
})