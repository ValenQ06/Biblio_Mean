import express from "express";
import bookController from "../controllers/bookController.js";
import bookMidd from "../middleware/bookValidate.js";
const router = express.Router();

router.post(
  "/registerbook",
  bookMidd.existingBook,
  bookController.registerbook
);

router.get("/listBooks/:name?", bookController.listBooks);

export default router;
