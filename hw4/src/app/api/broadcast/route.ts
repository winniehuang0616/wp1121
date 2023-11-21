import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { broadcastTable } from "@/db/schema";

const addbullenRequestSchema = z.object({
  chatroom: z.string(),
  content: z.string(),
});

type addbullenRequest = z.infer<typeof addbullenRequestSchema>;

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data)

  try {
    addbullenRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { chatroom, content } = data as addbullenRequest;

  try {
    await db
      .insert(broadcastTable)
      .values({
        chatroom,
        content
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

const putbullenRequestSchema = z.object({
    chatroom: z.string(),
    content: z.string(),
  });

type putbullenRequest = z.infer<typeof putbullenRequestSchema>;
  
  export async function PUT(request: NextRequest) {
    const data = await request.json();
  
    try {
      putbullenRequestSchema.parse(data);
    } catch (error) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { chatroom, content } = data as putbullenRequest;
  
    try {
      await db
        .update(broadcastTable)
        .set({content:content})
        .where(eq(broadcastTable.chatroom, chatroom))
        .execute();
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 },
      );
    }
  
    return new NextResponse("OK", { status: 200 });
  }