import musicForm from "../models/adminForm.js";
import mongoose from "mongoose";

export const addMusic = async (req, res) => {
  const music = req.body;
  const newMusic = new musicForm({ ...music });

  try {
    await newMusic.save();
    res.status(201).json(newMusic);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getMusics = async (req, res) => {
  try {
    const musics = await musicForm.find().sort({ _id: -1 });

    res.status(200).json({ data: musics });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteMusic = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No music with that id");

  await musicForm.findByIdAndDelete(_id);

  res.json({ message: "Music Deleted Successfully" });
};
