import {mongoose, Schema} from "../index.js";


const houseType = new Schema({
    type: {
        type: String,
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, "Invalid type"]
    },
    isValide: {
        type: Boolean,
        default: false,
    }
})

export const Houses = mongoose.model('HousesType', houseType)