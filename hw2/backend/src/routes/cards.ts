// import {} from "../controllers/lists";
import {
  createCard,
  deleteCard,
  getCard,
  getCards,
  updateCard,
} from "../controllers/cards";
import express from "express";

const router = express.Router();

// GET /api/cards
router.get("/", getCards);
// GET /api/cards/:id
router.get("/:id", getCard);
// POST /api/cards
router.post("/", createCard);
// PUT /api/cards/:id
router.put("/:id", updateCard);
// DELETE /api/cards/:id
router.delete("/:id", deleteCard);

// export the router
export default router;
