import { eq, desc, sql, like } from "drizzle-orm";
import Activity from "@/components/Activity";
import Header from "@/components/Header";
import { db } from "@/db";
import { joinsTable, activitysTable, usersTable } from "@/db/schema";

type HomePageProps = {
  searchParams: {
    username?: string;
    handle?: string;
    search?: string | null;
  };
};

export default async function Home({
  searchParams: { username, handle, search },
}: HomePageProps) {  

  const joinsSubquery = db.$with("joins_count").as(
    db
      .select({
        activityId: joinsTable.activityID,
        // some times we need to do some custom logic in sql
        // although drizzle-orm is very powerful, it doesn't support every possible
        // SQL query. In these cases, we can use the sql template literal tag
        // to write raw SQL queries.
        // read more about it here: https://orm.drizzle.team/docs/sql
        joins: sql<number | null>`count(*)`.mapWith(Number).as("joins"),
      })
      .from(joinsTable)
      .groupBy(joinsTable.activityID),
  );

  const joinedSubquery = db.$with("joined").as(
    db
      .select({
        activityId: joinsTable.activityID,
        // this is a way to make a boolean column (kind of) in SQL
        // so when this column is joined with the tweets table, we will
        // get a constant 1 if the user liked the tweet, and null otherwise
        // we can then use the mapWith(Boolean) function to convert the
        // constant 1 to true, and null to false
        joined: sql<number>`1`.mapWith(Boolean).as("joined"),
      })
      .from(joinsTable)
      .where(eq(joinsTable.handle, handle ?? "")),
  );

  const activitys = await db
    .with(joinsSubquery, joinedSubquery)
    .select({
      id: activitysTable.id,
      activityName: activitysTable.activityName,
      createdAt: activitysTable.createdAt,
      joins: joinsSubquery.joins,
      joined: joinedSubquery.joined,
    })
    .from(activitysTable)
    .orderBy(desc(activitysTable.createdAt))
    .leftJoin(joinsSubquery, eq(activitysTable.id, joinsSubquery.activityId))
    .leftJoin(joinedSubquery, eq(activitysTable.id, joinedSubquery.activityId))
    .where(
    search
      ? (
          like(activitysTable.activityName, `%${search}%`)
        )
      : undefined
    )
    .execute();

  if (username && handle) {
  await db
    .insert(usersTable)
    .values({
      userName: username,
      handle,
    })
    // Since handle is a unique column, we need to handle the case
    // where the user already exists. We can do this with onConflictDoUpdate
    // If the user already exists, we just update the display name
    // This way we don't have to worry about checking if the user exists
    // before inserting them.
    .onConflictDoUpdate({
      target: usersTable.handle,
      set: {
        userName: username,
      },
    })
    .execute();
  }

  return (
    <>
      <div className="flex w-full flex-col pt-2">
        <Header/>
        {activitys.map((activity) => (
          <Activity
            key={activity.id}
            id={activity.id}
            name={activity.activityName}
            joins={activity.joins}
            joined={activity.joined}
            user={username}
            handle={handle}
          />
        ))}
      </div>
    </>
  );
}
