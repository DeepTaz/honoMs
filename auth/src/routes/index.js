import {Hono} from "hono"
import {zValidator} from '@hono/zod-validator'
import {
    logoutController,
    signInController,
    signUpController
} from "../controllers/sign.js";
import {PATHS} from "../common/constant.js";
import {getUserController, profileController} from "../controllers/user.js";
import {SERVER_STATUS_CODE} from "../../../common/constant.js";
import {zodErrorHandle} from "../../../common/errors.js";
import {userSchema} from "../../../common/validator.js";
import {authMiddleware} from "../../../common/honoUtil.js";

const route = new Hono()

const {SIGN_UP, SIGN_IN, LOGOUT, USER, PROFILE} = PATHS

route.post(SIGN_UP, zValidator("json", userSchema, (result, context) => {
    if (!result.success) {
        return context.json(zodErrorHandle(result), SERVER_STATUS_CODE.BAD_REQUEST)
    }
}), signUpController)

route.post(SIGN_IN, signInController)

route.all(LOGOUT, authMiddleware, logoutController)

route.on(["GET", "PUT", "DELETE"], PROFILE, authMiddleware, profileController)

route.get(USER, authMiddleware, getUserController);

export {
    route as routes
}