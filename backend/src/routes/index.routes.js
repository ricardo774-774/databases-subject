import { Router } from "express";
import { suma } from "../controllers/index.controller.js";

const router = Router();

router.get('/ping', suma);

export default router;