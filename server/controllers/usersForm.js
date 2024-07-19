import reviewForm from "../models/usersForm.js";

export const addFormData = async (req, res) => {
  const review = req.body;

  const newReview = new reviewForm({ ...review });

  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
