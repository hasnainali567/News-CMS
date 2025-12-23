import { Router } from "express";
import { getSettingPage } from "../../controllers/admin-controllers/setting.controller.js";

const router = Router();

router.get('/', getSettingPage);



export default router;