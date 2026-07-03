import mongoose, {Schema, Document as MongooseDocument} from "mongoose";

interface documentModel extends MongooseDocument {
  source: string;
  title: string;
  content: string;
  lastIngestedAt: Date;
}

const documentSchema = new Schema<documentModel>({
  source: {
   type: String
  },
  title: {
  type: String,
  required: true,
},
content:{
  type: String,
  required: true
},
lastIngestedAt: {
  type: Date,
  default: Date.now()
}

})


export const Document = mongoose.model<documentModel>("Document", documentSchema)