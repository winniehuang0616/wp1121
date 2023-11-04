import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { activitysTable } from "@/db/schema";

// zod is a library that helps us validate data at runtime
// it's useful for validating data coming from the client,
// since typescript only validates data at compile time.
// zod's schema syntax is pretty intuitive,
// read more about zod here: https://zod.dev/
const addActivityRequestSchema = z.object({
  activityName: z.string().min(1).max(50),
  startTime: z.string(),
  endTime: z.string(),
});

// you can use z.infer to get the typescript type from a zod schema
type addActivityRequest = z.infer<typeof addActivityRequestSchema>;

// This API handler file would be trigger by http requests to /api/likes
// POST requests would be handled by the POST function
// GET requests would be handled by the GET function
// etc.
// read more about Next.js API routes here:
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    // parse will throw an error if the data doesn't match the schema
    // if that happens, we return a 400 error
    addActivityRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // the `data` variable is now guaranteed to be of type PostTweetRequest
  // but the compiler doesn't know that, so we have to cast it with `as`
  const { activityName, startTime, endTime } = data as addActivityRequest;
  console.log(activityName, startTime, endTime);
  try {
    const result = await db
      .insert(activitysTable)
      .values({
        activityName,
        startTime: new Date(startTime), // 轉換成 Date 物件
        endTime: new Date(endTime),     // 轉換成 Date 物件
      })
      .returning({ id: activitysTable.id })
      .execute();
    const id = result[0]?.id; // Assuming the result is an array with the first element containing the inserted ID
    return new NextResponse(
      JSON.stringify({ id: id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error inserting data into the database:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
