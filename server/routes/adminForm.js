import { Router } from "express";
import { addMusic, getMusics, deleteMusic } from "../controllers/adminForm.js";
import { checkAdmin } from "../middleware/admin.js";

const router = Router();

router.post("/", checkAdmin, addMusic);
router.get("/", getMusics);
router.delete("/:id", checkAdmin, deleteMusic);

export default router;
