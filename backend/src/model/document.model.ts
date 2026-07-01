import mongoose, {Schema, InferSchemaType} from "mongoose";

const documentSchema = new Schema({
title: {
  type: String,
  required: true,
},
content:{
  type: String,
  required: true
}
}, {timestamps: true})

export type IDocument = InferSchemaType<typeof documentSchema>

export const Document = mongoose.model<IDocument>("Document", documentSchema)