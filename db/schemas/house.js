import {mongoose, Schema} from "../index.js"
import {locationType, TG_REGEX_NUM} from "./consant";

const pointSchema = new Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinate: {
        type: [Number],
        required: true
    }
})

const houseSchema = new Schema({
    ownerPhoneNumber: {
        type: String,
        unique: true,
        match: [TG_REGEX_NUM, "Numéro de téléphone invalide."],
        required: [true, "Le numéro de telephone est requis."]
    },
    title: {
        type: String,
        required: [true, "Veuillez donner un titre."]
    },
    description: {
        type: String,
    },
    city: {
        type: String,
        required: [true, "Veuillez spécifiér la ville dans la quelle elle ce trouve."],
    },
    address: {
        type: String,
        required: [true, "Veuillez specifier l'adresse de la maison."],
    },
    houseImages: {
        type: [Mongoose.Schema.Types.ObjectId],
    },
    houseType: {
        type: String,
        required: [true, "Le type de la maison."],
        enum: locationType
    },
    country: {
        default: "Togo"
    },
    price: {
        type: Number,
        required: [true, "Le prix de la maison svp!"]
    },
    availability: {
        type: Boolean,
        default: true,
        required: [true, "Veuillez spécifier la disponibilités de la maison."],
    },
    location: {
        type: pointSchema,
        required: [true, "La localisation est requise."]
    },
    like: {
        type: Number,
        default: 0
    }
}, {versionKey: false, timestamps: true})

export const Houses = mongoose.model('Houses', houseSchema)