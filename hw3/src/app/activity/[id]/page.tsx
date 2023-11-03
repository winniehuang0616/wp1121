import { redirect } from "next/navigation";
import { eq, asc, and } from "drizzle-orm";
import { db } from "@/db";
import { joinsTable, activitysTable, usersTable, commentTable } from "@/db/schema";
import ActivityHeader from "@/components/ActivityHeader";
import Comments from "@/components/Comments";

type ActivityPageProps = {
  params: {
    // this came from the file name: [tweet_id].tsx
    id: string;
  };
  searchParams: {
    // this came from the query string: ?username=madmaxieee
    username?: string;
    handle?: string;
  };
};

export default async function activity({
    params: { id },
    searchParams: { username, handle },
    }: ActivityPageProps) {
    const activityID = parseInt(id);

    const errorRedirect = () => {
      const params = new URLSearchParams();
      username && params.set("username", username);
      handle && params.set("handle", handle);
      redirect(`/?${params.toString()}`);
    };

    if (isNaN(activityID)) {
      errorRedirect();
    };   
  
    const [activitys] = await db
      .select({
        id: activitysTable.id,
        activityName: activitysTable.activityName,
        startTime: activitysTable.startTime,
        endTime: activitysTable.endTime,
      })
      .from(activitysTable)
      .where(eq(activitysTable.id, activityID))
      .execute();

    if (!activitys) {
      errorRedirect();
    }

    const joins = await db
    .select({
      id: joinsTable.id,
    })
    .from(joinsTable)
    .where(eq(joinsTable.activityID, activityID))
    .execute();

    const numJoins = joins.length;

    // 只會有 null 或 有一個 id
    const [joined] = await db 
      .select({
        id: joinsTable.id,
      })
      .from(joinsTable)
      .where(
        and(
          eq(joinsTable.activityID, activityID),
          eq(joinsTable.handle, handle ?? ""),
        ),
      )
      .execute();

    const comments = await db
    .select({
      id: commentTable.id,
      user: usersTable.userName,
      content: commentTable.content
    })
    .from(commentTable)
    .orderBy(asc(commentTable.createdAt))
    .leftJoin(usersTable, eq(commentTable.handle, usersTable.handle))
    .where(eq(commentTable.activityID, activityID))
    .execute();

      const activity = {
        id: activitys.id,
        name: activitys.activityName,
        startTime: new Date(activitys.startTime),
        endTime: new Date(activitys.endTime),
        joins: joins.length,
        joined: Boolean(joined)
      };

    return (
    <>
      <ActivityHeader 
      activityID={activitys.id}
      name={activitys.activityName}
      startTime={new Date(activitys.startTime)}
      endTime={new Date(activitys.endTime)}
      joins={joins.length}
      joined={Boolean(joined)}
      user={username??" "}
      handle={handle?? " "}
      />
      
      {comments.map((comment) => (
        <Comments
        key={comment.id}
        user={comment.user}
        content={comment.content}
        />
      ))}
    </>
    )
  }