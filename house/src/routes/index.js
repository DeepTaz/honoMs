import {Hono} from "hono"
import {authMiddleware} from "../../../common/honoUtil.js";
import {sanitizeMongo} from "../../../common/util.js";
import {Houses} from "../../../db/schemas/house.js";

const housesRoute = new Hono()

housesRoute.post("/house", authMiddleware, async function (context) {
    const body = sanitizeMongo(await context.req.json())
    const user = context.currUser
    console.log(user)
    const house = await new Houses({
        userAdd: user._id,
        ...body,
        country: "Togo",
    }).save()

    return context.json({data: house})
})


housesRoute.put("/house/:id", authMiddleware, async function (context) {
    //const body = sanitizeMongo(await context.req.json())
    const id = context.req.param('id')
    console.log(id)
    //const house = await new Houses.findByIdAndUpdate()
    return context.json({message: "house"})
})


housesRoute.get("/houses", function (context) {

    return context.json({message: "house"})
})


export default housesRoute