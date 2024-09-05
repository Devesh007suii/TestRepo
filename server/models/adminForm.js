import { Schema, model } from "mongoose";

const formSchema = new Schema({
  musicFile: {
    type: String,
    required: true,
  },
  musicName: {
    type: String,
    required: true,
  },
  musicImg: {
    type: String,
  },
});

const musicForm = model("musicForm", formSchema);
export default musicForm;
