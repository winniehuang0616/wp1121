import {
  getDiarys,
  createDiarys,
  editDiarys,
  filterDiarys,
} from "../controllers/diarys.js";
import express from "express";

// Create an express router
const router = express.Router();

router.get("/search", filterDiarys);
router.get("/", getDiarys);
router.post("/", createDiarys);
router.put("/:id", editDiarys);

// export the router
export default router;
