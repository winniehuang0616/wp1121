import { z } from "zod";

export const postMessageSchema = z.object({
  chatroom: z.string(),
  userId: z.string(),
  content: z.string(),
  delete: z.string(),
});
