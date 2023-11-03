import { NextResponse, type NextRequest } from "next/server";
import { number, z } from "zod";
import { db } from "@/db";
import { commentTable } from "@/db/schema";

const addCommentRequestSchema = z.object({
  activityID: z.number(),
  handle: z.string(),
  content: z.string(),
});

// you can use z.infer to get the typescript type from a zod schema
type addCommentRequest = z.infer<typeof addCommentRequestSchema>;

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
    addCommentRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // 把 activityID 轉成整數
  const activityID = parseInt(data.activityID, 10); // assuming base 10
  console.log(activityID)
  if (isNaN(activityID)) {
    return NextResponse.json({ error: "Invalid activityID" }, { status: 400 });
  }
  
  // the `data` variable is now guaranteed to be of type PostTweetRequest
  // but the compiler doesn't know that, so we have to cast it with `as`
  const { handle, content } = data as addCommentRequest;
  try {
    await db
      .insert(commentTable)
      .values({
        activityID,
        handle,
        content,
      })
      .execute();
  } catch (error) {
    console.error("Error inserting data into the database:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}
