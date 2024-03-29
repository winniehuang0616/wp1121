import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { chatTable } from "@/db/schema";

const addchatRequestSchema = z.object({
  chatroom: z.string(),
  userId: z.string(),
  content: z.string(),
  cancel: z.string(),
});

type addchatRequest = z.infer<typeof addchatRequestSchema>;

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    addchatRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { chatroom, userId, content, cancel } = data as addchatRequest;

  try {
    await db
      .insert(chatTable)
      .values({
        chatroom,
        userId,
        content,
        cancel
      })
      .execute();
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}

