import {Hono} from "hono"
import {zValidator} from '@hono/zod-validator'
import {
    logoutController,
    signInController,
    signUpController
} from "../controllers/sign.js";
import {PATHS} from "../common/constant.js";
import {getUserController, profileController} from "../controllers/user.js";
import {STATUS_CODE} from "../../../common/constant.js";
import {zodErrorHandle} from "../../../common/errors.js";
import {userSchema} from "../../../common/validator.js";
import {authMiddleware} from "../../../common/honoUtil.js";

const authRoute = new Hono()

const {SIGN_UP, SIGN_IN, LOGOUT, USER, PROFILE} = PATHS

authRoute.post(SIGN_UP, zValidator("json", userSchema, (result, context) => {
    if (!result.success) {
        return context.json(zodErrorHandle(result), STATUS_CODE.BAD_REQUEST)
    }
}), signUpController)

authRoute.post(SIGN_IN, signInController)

authRoute.all(LOGOUT, authMiddleware, logoutController)

authRoute.on(["GET", "PUT", "DELETE"], PROFILE, authMiddleware, profileController)

authRoute.get(USER, authMiddleware, getUserController);

export {authRoute}
