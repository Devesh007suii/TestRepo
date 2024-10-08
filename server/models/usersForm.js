import { Schema, model } from "mongoose";

const quesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  questions: {
    type: [String],
  },
  customBeat: {
    type: String,
    required: true,
  },
  beatDescription: {
    type: String,
  },
});

const reviewForm = model("reviewForm", quesSchema);
export default reviewForm;
