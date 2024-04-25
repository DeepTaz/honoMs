import {mongoose, Schema} from "../index.js";


const citySchema = new Schema({
    name: {
        type: String,
        required: [true, "Ce champ es requis."],
        unique: true
    },
    isValid: {
        type: Boolean,
        default: false
    }
})


export const City = mongoose.model('cities', citySchema)