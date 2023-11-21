import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import Pusher from "pusher";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";

import { db } from "@/db";
import { chatTable } from "@/db/schema";

const addchatRequestSchema = z.object({
  chatroom: z.string(),
  userId: z.string(),
  content: z.string(),
});

type addchatRequest = z.infer<typeof addchatRequestSchema>;

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    try {
      addchatRequestSchema.parse(data);
    } catch (error) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

  const { chatroom, userId, content } = data as addchatRequest;
  const cancel = "false";

  const [postedChat] = await db
    .insert(chatTable)
    .values({
      chatroom,
      userId,
      content,
      cancel
    })
  .returning();
  
  // Trigger pusher event
  const pusher = new Pusher({
    appId: privateEnv.PUSHER_ID,
    key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
    secret: privateEnv.PUSHER_SECRET,
    cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true,
  });

  await pusher.trigger(`private-${postedChat.chatroom}`, "chat:update", {
    senderId: userId,
    message: {
      chatroom: postedChat.chatroom,
      userId: postedChat.userId,
      content: postedChat.content,
      cancel: postedChat.cancel,
    },
  });

  return NextResponse.json(
    {
      chatroom: postedChat.chatroom,
      userId: postedChat.userId,
      content: postedChat.content,
      cancel: postedChat.cancel,
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

const deletechatRequestSchema = z.object({
    id: z.number(),
    userId: z.string(),
  });

type deletechatRequest = z.infer<typeof deletechatRequestSchema>;

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  try {
  try {
    deletechatRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { id, userId } = data as deletechatRequest;

  const [deletedchat] = await db
    .delete(chatTable)
    .where(
      eq(chatTable.id, id),
    )
    .returning();

  const pusher = new Pusher({
    appId: privateEnv.PUSHER_ID,
    key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
    secret: privateEnv.PUSHER_SECRET,
    cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true,
  });

  await pusher.trigger(`private-${deletedchat.chatroom}`, "chat:delete", {
    userId: userId,
  });

  return NextResponse.json(
    {
      userId: deletedchat.userId,
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

const putchatRequestSchema = z.object({
    id: z.number(),
  });

type putchatRequest = z.infer<typeof putchatRequestSchema>;
  
  export async function PUT(request: NextRequest) {
    const data = await request.json();
  
    try {
      putchatRequestSchema.parse(data);
    } catch (error) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { id } = data as putchatRequest;
  
    try {
      await db
        .update(chatTable)
        .set({cancel:"true"})
        .where(eq(chatTable.id, id))
        .execute();
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 },
      );
    }
  
    return new NextResponse("OK", { status: 200 });
  }
