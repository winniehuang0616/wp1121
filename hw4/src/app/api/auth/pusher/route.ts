import { type NextRequest, NextResponse } from "next/server";

import { and, eq, or } from "drizzle-orm";

import { db } from "@/db";
import { chatroomTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.formData();
    const socketId = data.get("socket_id") as string;
    const channel = data.get("channel_name") as string;

    // channel name is in the format: private-<docId>
    const chatroom = channel.slice(8);
    if (!chatroom) {
      return NextResponse.json(
        { error: "Invalid channel name" },
        { status: 400 },
      );
    }

    // Get the document from the database
    const [chatOwnership] = await db
      .select()
      .from(chatroomTable)
      .where(
        and(
          or(eq(chatroomTable.userId1, session.user.id),eq(chatroomTable.userId2, session.user.id)),
          eq(chatroomTable.displayId, chatroom),
        ),
      );
    if (!chatOwnership) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = {
      user_id: session.user.id,
    };

    const authResponse = pusherServer.authorizeChannel(
      socketId,
      channel,
      userData,
    );

    console.log("auth", authResponse)

    return NextResponse.json(authResponse);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error in push" },
      {
        status: 500,
      },
    );
  }
}
