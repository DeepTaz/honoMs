import {AUTH, COOKIE_OPTIONS} from "../auth/src/common/constant.js";
import {decode, sign} from "hono/jwt";
import {deleteCookie, getCookie, setCookie} from "hono/cookie";
import {createMiddleware} from "hono/factory";
import {intoMillisecond} from "./util.js";
import {COOKIES, HEADERS, STATUS_CODE} from "./constant.js";
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
    //Create token with headers
    //const headersToken = "Bear  "+token
    setHeaders(context, HEADERS.AUTH, token)
    // Create cookie
    // There are a problems with set cookie options
    //Comment expires on cookies options when we use webstorm http request .
    setCookie(context, COOKIES.AUTH, token,{
        ...COOKIE_OPTIONS,
        expires: new Date(cookieData.expires)
    })
}


export const authMiddleware = createMiddleware(async function (context, next) {
    const cookie = getCookie(context)[COOKIES.AUTH] || context.req.header(HEADERS.AUTH);

    if (!cookie) {
        throw new Api_error("unauthorized😒.", "auth fail", STATUS_CODE.UNAUTHORIZED)
    }
    const {payload} = decode(cookie)
    let time = new Date().getTime()
    if (time > payload.expires) {
        deleteServerCookie(context, COOKIES.AUTH)
        throw new Api_error("Token expires", "tk-expires", STATUS_CODE.BAD_REQUEST)
    }
    const user = await Users.findById(payload.id)
    if (!user) {
        deleteServerCookie(context, COOKIES.AUTH)
        throw new Api_error("Please provide a valid data", "not-found", STATUS_CODE.UNAUTHORIZED)
    }
    context.currUser = user
    await next();
})

export function deleteServerCookie(context, cookieName) {
    return deleteCookie(context, cookieName)
}


export function setHeaders(context, name, header) {
    context.header(name, header);
}

