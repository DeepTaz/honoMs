import {mongoose, Schema, schemaObjectId} from "../index.js"
import {locationType, TG_REGEX_NUM} from "./consant.js";
import {City} from "./city.js";

const pointSchema = new Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true,
        select: false,
    },
    coordinates: {
        type: [Number],
        required: true,
        select: false
    }
})

const houseTypeSchema = new Schema({
    name: {
        type: String,
        required: [true, "Le type de la maison est requis."],
        enum: locationType
    },
    room: {
        type: Number,
        required: [true, "ce champ est requis "],
        default: 1,
    },
    kitchen: {
        type: Number,
        default: 0
    },
    bedroom: {
        type: Number,
        default: 0
    },
    livingRoom: {
        type: Number,
        default: 0
    }
})

houseTypeSchema.pre("save", async function (next) {

    if (this.room <= 1) {
        this.kitchen = 0
        this.livingRoom = 0
        this.bedroom = 0
    }
    next()
})

const houseSchema = new Schema({
    userAdd: {
        type: schemaObjectId,
        ref: "Users",
        required: [true, "who add the house"]
    },
    ownerPhoneNumber: {
        type: String,
        match: [TG_REGEX_NUM, "Numéro de téléphone invalide."],
        required: [true, "Le numéro de telephone est requis."],
        selected: false,
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
        required: [true, "Veuillez spécifiér la ville dans la quelle elle ce trouve."]
    },
    address: {
        type: String,
        required: [true, "Veuillez specifier l'adresse de la maison."],
    },
    houseImages: {
        type: [String],
    },
    surface: Number,
    houseType: houseTypeSchema,
    country: {
        type: String,
        default: "Togo"
    },
    price: {
        type: Number,
        required: [true, "Le prix de la maison svp!"]
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, "Veuillez spécifier la disponibilités de la maison."],
    },
    location: pointSchema,
    like: {
        type: Number,
        default: 0
    }
}, {versionKey: false, timestamps: true})


houseSchema.pre("save", async function (next) {
    if (!this.isModified("city")) return next()
    let city = await City.findOne({name: this.city})
    if (!city) {
        city = await new City({name: this.city}).save();
    }
    this.city = city.name;
    next()
})

export const Houses = mongoose.model('Houses', houseSchema)