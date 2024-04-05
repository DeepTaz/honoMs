import {SERVER_STATUS_CODE} from "./constant.js";
import {createServerObjectError} from "./util.js";

//import {deleteServerCookie} from "../controllers/honoUtil.js";

export function handleApiError(error, context) {
    //This is for just fun🤣🤣🤣
    console.error(error.name,error)
    //console.log(error)
    //for fun hum.....
    const errorResult = errorHandle(error, context)
    return context.json(errorResult, errorResult.statusCode)
}

export function zodErrorHandle(zodError) {
    return zodError.error.issues.reduce((a, c) => {
        a.code = c.code
        a.message = c.message
        a.path = c.path
        return a
    }, {})
}


export function firebaseErrorHandle(fireError) {
    return {
        code: fireError.code,
        message: fireError.message
    }
}


export function errorHandle(error, context) {
    const errorFuncObj = {
        11000: function () {
            return createServerObjectError("duplicate", Object.keys(error.keyValue)[0], "duplicate value", SERVER_STATUS_CODE.CONFLICT)
        },
        "ValidationError": function () {
            let e = {};
            Object.keys(error.errors).forEach((key) => {
                e.path = key
                e.message = error.errors[key].message
            });

            return createServerObjectError("validation fail", e.path, e.message, SERVER_STATUS_CODE.BAD_REQUEST)
        },
        "Api_Error": function () {
            return createServerObjectError(error.codeName, "", error.message, error.statusCode)
        },
        "JwtTokenInvalid": function (context) {
            //deleteServerCookie(context, COOKIES_NAMES.JWT)
            return createServerObjectError("jwtError", "jwt", error.message, SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR)
        },
        "SyntaxError": function () {
            return createServerObjectError("JSON error", "JSON", error.message, SERVER_STATUS_CODE.BAD_REQUEST)
        }
    }[error.code || error.name]
    return errorFuncObj ? errorFuncObj(context) : createServerObjectError();
}