import {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
} from "../controllers/lists";
import express from "express";

const router = express.Router();

// GET /api/lists
router.get("/", getLists);
// GET /api/lists/:id
router.get("/:id", getList);
// POST /api/lists
router.post("/", createList);
// PUT /api/lists/:id
router.put("/:id", updateList);
// DELETE /api/lists/:id
router.delete("/:id", deleteList);

// export the router
export default router;
