import optionalUserQues from "../models/optionalQues.js";
import mongoose from "mongoose";

export const addQuestion = async (req, res) => {
  const { question } = req.body;
  const newQuestion = new optionalUserQues({ question });

  try {
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getQuestion = async (req, res) => {
  try {
    const questions = await optionalUserQues.find().sort({ _id: -1 });

    res.status(200).json({ data: questions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No question with that id");

  await optionalUserQues.findByIdAndDelete(_id);

  res.json({ message: "Question Deleted Successfully" });
};

export const updateQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const question = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No question with that id");

  const updatedQues = await optionalUserQues.findByIdAndUpdate(_id, question, {
    new: true,
  });

  res.json(updatedQues);
};
