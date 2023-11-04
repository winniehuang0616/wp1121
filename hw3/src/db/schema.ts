import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// schemas define the structure of the tables in the database
// watch this playlist to learn more about database schemas:
// although it uses MySQL, the concepts are the same
// https://planetscale.com/learn/courses/mysql-for-developers/schema/introduction-to-schema

export const usersTable = pgTable(
  "users",
  {
    // It is recommended to use something that means nothing outside of the database
    // as the primary key, so that you don't have to change it if the data it represents
    // changes. For example, if you use a user's email as the primary key, and then
    // the user changes their email, you have to update all the foreign keys that
    // reference that email. If you use a serial primary key, you don't have to worry
    // about that.
    id: serial("id"),
    // It is a good idea to set a maximum length for varchars, so that you don't
    // waste space in the database. It is also a good idea to move as much constraints
    // to the database as possible, so that you don't have to worry about them in
    // your application code.
    handle: varchar("handle", { length: 50 }).notNull().primaryKey(),
    // 因為 unique 過不了所以暴力設成 primary_key ..
    userName: varchar("user_name", { length: 50 }).notNull(),
  },
  (table) => ({
    handleIndex: index("handle_index").on(table.handle),
  }),
);

export const activitysTable = pgTable(
  "activitys",
  {
    id: serial("id").primaryKey(),
    activityName: varchar("activity_name", { length: 50 }).notNull().unique(),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time").notNull(),
    createdAt: timestamp("created_at").default(sql`now()`),
  },
  (table) => ({
    activityNameIndex: index("activity_name_index").on(table.activityName),
  }),
);

export const commentTable = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    activityID: integer("activityID").notNull()
      .references(() => activitysTable.id, { onDelete: "cascade" }),
    handle: varchar("handle", { length: 50 }).notNull()
      .notNull()
      .references(() => usersTable.handle, { onDelete: "cascade" }),
    content: varchar("content"),
    createdAt: timestamp("created_at").default(sql`now()`),
  },
  (table) => ({
    activityIDIndex: index("activityID_index").on(table.activityID),
  }),
);

export const joinsTable = pgTable(
  "joins",
  {
    id: serial("id").primaryKey(),
    handle: varchar("handle", { length: 50 }).notNull()
      .references(() => usersTable.handle, { onDelete: "cascade" }),
    activityID: integer("activityID").notNull()
      .references(() => activitysTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    activityIDIndex: index("activityID_index").on(table.activityID),
  }),
);
