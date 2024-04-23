import {createCookie, deleteServerCookie} from "../../../common/honoUtil.js";
import {COOKIES, SERVER_STATUS_CODE} from "../../../common/constant.js";
import {Api_error} from "../../../common/api_error.js";
import {Users} from "../../../db/schemas/user.js";
import {sanitizeMongo} from "../../../common/util.js";

// creation de compte
export const signUpController = async function (context) {
    const body = sanitizeMongo(await context.req.json())
    body.phoneNumber = body.phoneNumber.startsWith("+228") ? body.phoneNumber : "+228" + body.phoneNumber;

    const user = await new Users(body).save()
    await createCookie({id: user._id}, context)
    return context.json({
        message: "ok"
    }, SERVER_STATUS_CODE.OK)

}

//connexion
export const signInController = async function (context) {
    const body = sanitizeMongo(await context.req.json())

    if (!body.password || !body.phoneNumber) {
        throw new Api_error("Nous n'acceptons pas de champs vide", "login fail", SERVER_STATUS_CODE.BAD_REQUEST)
    }

    let user = await Users.findOne({phoneNumber: body.phoneNumber}).select("+password")
    let isUser = user && await user.comparePassword(body.password)

    if (!user || !isUser) {
        throw new Api_error('Le mots de passe ou le numéro de telephone est incorrecte😒.', "login fail", SERVER_STATUS_CODE.UNAUTHORIZED)
    }
    // create cookie
    await createCookie({id: user._id}, context)

    return context.json({
        message: "ok"
    }, SERVER_STATUS_CODE.OK)
}


export const logoutController = async function (context) {
    deleteServerCookie(context, COOKIES.AUTH)
    return context.json({
        message: "successfully logout👌."
    }, SERVER_STATUS_CODE.OK)
}


