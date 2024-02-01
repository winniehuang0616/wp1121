import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { broadcastTable } from "@/db/schema";

import Pusher from "pusher";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";

const addbullenRequestSchema = z.object({
  userId: z.string(),
  chatroom: z.string(),
  content: z.string(),
});

type addbullenRequest = z.infer<typeof addbullenRequestSchema>;

export async function POST(request: NextRequest) {
  const data = await request.json();

  try{
  try {
    addbullenRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, chatroom, content } = data as addbullenRequest;

  const [postbullen] = await db
      .insert(broadcastTable)
      .values({
        chatroom,
        content
      })
      .returning();
  
  const pusher = new Pusher({
        appId: privateEnv.PUSHER_ID,
        key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
        secret: privateEnv.PUSHER_SECRET,
        cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
        useTLS: true,
      });
    
      await pusher.trigger(`private-${postbullen.chatroom}`, "chat:post", {
        userId: userId,
      });
    
      return NextResponse.json(
        {
          content: postbullen.content,
        },
        { status: 200 },
      );
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { error: "Internal Server Error in message" },
          { status: 500 },
        );
      }
}

const putbullenRequestSchema = z.object({
    userId: z.string(),
    chatroom: z.string(),
    content: z.string(),
  });

type putbullenRequest = z.infer<typeof putbullenRequestSchema>;
  
export async function PUT(request: NextRequest) {
    const data = await request.json();
    try{
    try {
      putbullenRequestSchema.parse(data);
    } catch (error) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { userId, chatroom, content } = data as putbullenRequest;
  
    const [alterbullen] = await db
      .update(broadcastTable)
      .set({content:content})
      .where(eq(broadcastTable.chatroom, chatroom))
      .returning();
    
      const pusher = new Pusher({
        appId: privateEnv.PUSHER_ID,
        key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
        secret: privateEnv.PUSHER_SECRET,
        cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
        useTLS: true,
      });
    
      await pusher.trigger(`private-${alterbullen.chatroom}`, "chat:alter", {
        userId: userId,
      });
    
      return NextResponse.json(
        {
          content: alterbullen.content,
        },
        { status: 200 },
      );
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { error: "Internal Server Error in message" },
          { status: 500 },
        );
      }
}