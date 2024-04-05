import {Hono} from 'hono'
import {logger} from "hono/logger"
import {cors} from "hono/cors"
import {routes} from "./routes/index.js";
import {compress} from 'hono/compress';
import {SERVER_STATUS_CODE} from "../../common/constant.js";
import {handleApiError} from "../../common/errors.js";

const api = new Hono()


api.use("*", compress(), cors(), logger())

api.route("/", routes)


api.onError(handleApiError)


api.notFound((c) => {
    return c.json({message: "The ressources you search do not exists."}, SERVER_STATUS_CODE.NOT_FOUND)
})

export {
    api
}