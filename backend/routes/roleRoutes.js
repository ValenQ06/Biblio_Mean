import express from "express";
import roleController from "../controllers/roleController.js";
import roleMidd from "../middleware/roleValidate.js";

const router = express.Router();

//http://localhost:3001/api/role/registerRole
router.post("/registerRole", roleMidd.existingRol, roleController.registerRole);

router.get("/listrole/:name?", roleController.listrole);
router.get("/listroleAdmin/:name?", roleController.listroleAdmin);
router.put("/delete/:_id", roleController.deleteRole);
router.put("/updateRoleAdmin", roleController.updateRoleAdmin);

export default router;