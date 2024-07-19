import { Router } from "express";
import { addFormData } from "../controllers/usersForm.js";

const router = Router();

router.post("/", addFormData);

export default router;
