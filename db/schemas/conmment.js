import {mongoose, Schema, schemaObjectId} from "../index.js";


const commentSchema = new Schema({
    housing_ref: {
        type: schemaObjectId,
        required: [true, "L'id du logement est requis."]
    },
    content: {
        type: String,
        validate: {
            validator: function (val) {

            }
        }
    },
    ownerComment: {
        type: schemaObjectId,
        required: [true, "L'id l'auteur du commentaire est requis."]
    },
    parent: {
        type: schemaObjectId,
        default: null
    },
    like: {
        type: Number,
        default: 0
    }
}, {versionKey: false, timestamps: true})


export const Comments = mongoose.model('Comments', commentSchema)