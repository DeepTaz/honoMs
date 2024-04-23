import {COOKIES, SERVER_STATUS_CODE} from "../../../common/constant.js";
import {deleteServerCookie} from "../../../common/honoUtil.js";
import {Users} from "../../../db/schemas/user.js";
import {sanitizeMongo} from "../../../common/util.js";


export const profileController = async function (context) {
    return {
        "GET": async function (context) {
            return context.json(context.currUser)
        },
        "PUT": async function (context) {
            const body = sanitizeMongo(await context.req.json());
            await Users.findByIdAndUpdate(context.currUser._id, body, {runValidators: true})
            return context.json(SERVER_STATUS_CODE.NO_CONTENT)
        },
        "DELETE": async function (context) {
            await Users.findByIdAndDelete(context.currUser._id)
            deleteServerCookie(context, COOKIES.AUTH_JWT)
            return context.json(SERVER_STATUS_CODE.NO_CONTENT)
        }
    }[context.req.method](context)
}

export const getUserController = async function (context) {
    return context.json(await Users.findById(context.req.param("id")))
}

