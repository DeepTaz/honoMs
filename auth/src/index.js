import {Hono} from 'hono'
import {logger} from "hono/logger"
import {cors} from "hono/cors"
import {routes} from "./routes/index.js";
import {compress} from 'hono/compress';
import {handleApiError} from "./common/errro.js";

const api = new Hono()


api.use("*", compress(), cors(), logger())

api.route("/api/", routes)


api.onError(handleApiError)


api.notFound((c) => {
    return c.json({message: "The ressources you search do not exists."}, 404)
})

export {
    api
}