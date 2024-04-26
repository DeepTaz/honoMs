import {Hono} from "hono"
import {authMiddleware} from "../../../common/honoUtil.js";
import {sanitizeMongo} from "../../../common/util.js";
import {Houses} from "../../../db/schemas/house.js";
import {STATUS_CODE} from "../../../common/constant.js";

const housesRoute = new Hono()

//Add house
housesRoute.post("/house", authMiddleware, async function (context) {
    const body = sanitizeMongo(await context.req.json())
    const user = context.currUser

    const house = await new Houses({
        userAdd: user._id,
        ...body,
        country: "Togo",
    }).save()
    return context.json({data: house}, STATUS_CODE.OK)
})

//Edit house
housesRoute.put("/house/:id", authMiddleware, async function (context) {
    const body = sanitizeMongo(await context.req.json())
    await Houses.findByIdAndUpdate(context.req.param("id"), body, {runValidators: true})
    return context.json({message: 'ok'}, STATUS_CODE.OK)
})


housesRoute.post("/upload", async function (context) {
    const body = await context.req.parseBody({all: true})
    const fName = "files"
    let files = body[fName] instanceof Array ? body[fName] : [body[fName]]
    console.log(files)
    // after update i will update
    files = await Promise.all(files.map(async (item) => Buffer.from(await item.arrayBuffer())))
    // do the upload
    return context.json({message: "upload successfully"})
})


export default housesRoute