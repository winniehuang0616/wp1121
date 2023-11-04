import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { joinsTable } from "@/db/schema";

const JoinRequestSchema = z.object({
  handle: z.string(),
  activityID: z.number(),
});

type JoinRequest = z.infer<typeof JoinRequestSchema>;

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    JoinRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { handle, activityID } = data as JoinRequest;

  try {
    await db
      .insert(joinsTable)
      .values({
        handle,
        activityID,
      })
      .onConflictDoNothing()
      .execute();
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();

  try {
    JoinRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { handle, activityID } = data as JoinRequest;

  try {
    await db
      .delete(joinsTable)
      .where(
        and(
          eq(joinsTable.handle, handle),
          eq(joinsTable.activityID, activityID),
        ),
      )
      .execute();
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}
