import {AUTH, COOKIE_OPTIONS, COOKIES_NAMES} from "../auth/src/common/constant.js";
import {decode, sign} from "hono/jwt";
import {deleteCookie, getCookie, setCookie} from "hono/cookie";
import {createMiddleware} from "hono/factory";
import {intoMillisecond} from "./util.js";
import {SERVER_STATUS_CODE} from "./constant.js";
import {Users} from "../db/schemas/user.js";
import {Api_error} from "./api_error.js";

export async function createCookie(data, context) {
    const date = new Date().getTime()
    const cookieData = {
        ...data,
        createAt: date,
        expires: date + intoMillisecond(AUTH.EXPIRES)
    }
    const token = await sign(cookieData, AUTH.JWT_SECRET)
    setCookie(context, COOKIES_NAMES.JWT, token, {
        ...COOKIE_OPTIONS,
        expires: new Date(cookieData.expires)
    })
}


export const authMiddleware = createMiddleware(async function (context, next) {
    const cookie = getCookie(context)[COOKIES_NAMES.JWT];
    if (!cookie) {
        throw new Api_error("unauthorized😒.", "auth fail", SERVER_STATUS_CODE.UNAUTHORIZED)
    }
    const {payload} = decode(cookie)
    let time = new Date().getTime()
    if (time > payload.expires) {
        deleteServerCookie(context, COOKIES_NAMES.JWT)
        throw new Api_error("Token expires", "tk-expires", SERVER_STATUS_CODE.BAD_REQUEST)
    }
    const user = await Users.findById(payload.id)
    if (!user) {
        deleteServerCookie(context, COOKIES_NAMES.JWT)
        throw new Api_error("Please provide a valid data", "not-found", SERVER_STATUS_CODE.UNAUTHORIZED)
    }
    context.currUser = user
    await next();
})

export function deleteServerCookie(context, cookieName) {
    return deleteCookie(context, cookieName)
}