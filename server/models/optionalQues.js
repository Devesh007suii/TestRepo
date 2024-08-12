import { Schema, model } from "mongoose";

const optionalSchema = new Schema({
  question: {
    type: String,
  },
});

const optionalUserQues = model("optionalUserQues", optionalSchema);
export default optionalUserQues;
