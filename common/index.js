import {Hono} from 'hono'
import {logger} from "hono/logger"
import {cors} from "hono/cors"
import {compress} from 'hono/compress';
import {handleApiError} from "./errors.js";
import {SERVER_STATUS_CODE} from "./constant.js";


export default function createApi() {
    const api = new Hono()
    // les middlewares que j'utilise souvent.
    api.use("*", compress(), cors(), logger())

    api.onError(handleApiError)

    api.notFound((c) => {
        return c.json({message: "The ressources you search do not exists."}, SERVER_STATUS_CODE.NOT_FOUND)
    })
    return api
}


