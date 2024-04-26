import {Hono} from 'hono'
import {logger} from "hono/logger"
import {cors} from "hono/cors"
import {compress} from 'hono/compress';
import {handleApiError} from "./errors.js";
import {STATUS_CODE} from "./constant.js";
import {dynamicImport} from "./util.js";


export default function createApi() {
    const api = new Hono()

    api.use(compress(), cors(), logger())

    api.onError(handleApiError)

    api.notFound((c) => {
        return c.json({message: "The ressources you search do not exists."}, STATUS_CODE.NOT_FOUND)
    })
    return api
}

export async function startApi(api, config = {}) {
    try {
        const {serve} = await dynamicImport("@hono/node-server")
        const {mongoose} = await dynamicImport("../db/index.js")

        mongoose.connect(config.URI).then(_ => {
            serve({
                fetch: api.fetch,
                port: config.PORT,
            }, (addressInfo) => console.log(`server successfully start ${config.HOST} and run on port=${addressInfo.port}`))
        }).catch(_ => {
            console.error(`Unable to start the server cause can't connect to db.`)
            process.exit(1)
        })
    } catch (e) {
        console.error(e)
    }
}




