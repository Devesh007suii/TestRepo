import { Router } from "express";
import {
  addQuestion,
  getQuestion,
  deleteQuestion,
  updateQuestion,
} from "../controllers/optionalQues.js";

const router = Router();

router.post("/", addQuestion);
router.get("/", getQuestion);
router.delete("/:id", deleteQuestion);
router.patch("/:id", updateQuestion);

export default router;
