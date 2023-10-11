import type { ListData } from "@lib/shared_types";
import mongoose from "mongoose";
import type { Types } from "mongoose";

// In `ListData`, we have `id` as a string and `cards` as an array of `CardData`, but in the database, we want them both to be stored as an ObjectId.
interface ListDocument
  extends Omit<ListData, "id" | "cards">,
    mongoose.Document {
  cards: Types.ObjectId[];
}

interface ListModel extends mongoose.Model<ListDocument> {}

// We enforce the type by adding `<ListDocument>` after `mongoose.Schema`.
const ListSchema = new mongoose.Schema<ListDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const List = mongoose.model<ListDocument, ListModel>("List", ListSchema);
export default List;
