import { Router } from "express";
import {
  addQuestion,
  getQuestion,
  deleteQuestion,
  updateQuestion,
} from "../controllers/optionalQues.js";
import { checkAdmin } from "../middleware/admin.js";

const router = Router();

router.post("/", checkAdmin, addQuestion);
router.get("/", getQuestion);
router.delete("/:id", checkAdmin, deleteQuestion);
router.patch("/:id", checkAdmin, updateQuestion);

export default router;
