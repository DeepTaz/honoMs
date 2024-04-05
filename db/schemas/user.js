import {Schema, mongoose} from "../index.js"
import bcrypt from "bcryptjs"

import {SALT_WORK, TG_REGEX_NUM} from "./consant.js"

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "The pseudo is required"],
        trim: true,
        maxLength: [14, "au plus 10"],
        minLength: [4, "au moin 4 caractères"],
        validate: {
            validator: function (val) {
                return val.search(/[^\w-_éàè]/gi) === -1
            },
            message: "Seul les caractères special - et _ sont autoriser"
        }
    },
    /*
    email: {
        required: false,
        type: String,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Email invalid`],
    },*/
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, "Ce champs ne peut être vide"],
        match: [TG_REGEX_NUM, "Numéro de téléphone invalide"]
    },
    password: {
        type: String,
        required: [true, "Le mots de passe est requis."],
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, "Confirmer le mot de passe"],
        select: false,
        validate: {
            validator: function (val) {
                return this.password === val;
            },
            message: "Le mots de passe doit être identique.",
        },
    },
    photoUrl: {
        required: false,
        type: String,
        default: ""
    },
    /*connected: {
        type: Boolean,
        required: false,
        default: true
    },/*
    gender: {
        type: String,
        required: [true, "please select your gender"],
        enum: ["f", "m"]
    },*/
    /*status: {
        type: Boolean,
        default: false,
        select: false
    },/*
    Like: {
        type: Number,
        default: 0,
    }*/
}, {versionKey: false, timestamps: true})

userSchema.pre('save', function (next) {
    const user = this
    if (!user.isModified("password")) return next()
    bcrypt.genSalt(SALT_WORK, function (err, salt) {
        if (err) next(err)
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) next(err)
            user.password = hash
            user.confirmPassword = undefined;
            next()
        })
    })
})

userSchema.methods.comparePassword = async function (currPass) {
    return await bcrypt.compare(currPass, this.password)
};

export const Users = mongoose.models.User || mongoose.model("Users", userSchema);