import { sql } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  uuid,
  varchar,
  unique,
  timestamp,
} from "drizzle-orm/pg-core";

// Checkout the many-to-many relationship in the following tutorial:
// https://orm.drizzle.team/docs/rqb#many-to-many

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    hashedPassword: varchar("hashed_password", { length: 100 }).notNull().unique(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const chatroomTable = pgTable(
  "chatroom",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    userId1: uuid("user_id_1")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userId2: uuid("user_id_2")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    uniqCombination: unique().on(table.userId1, table.userId2),
  }),
);


export const chatTable = pgTable(
  "chat",
  {
    id: serial("id").primaryKey(),
    chatroom: uuid("chatroom_id")
      .notNull()
      .references(() => chatroomTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    content: varchar("content").notNull(),
    cancel: varchar("cancel").notNull(),
    createdAt: timestamp("created_at").default(sql`now()`),
  },
  (table) => ({
    displayIdIndex: index("chatroomID").on(table.chatroom),    
  }),
);

export const broadcastTable = pgTable(
  "broadcast",
  {
    id: serial("id").primaryKey(),
    chatroom: uuid("chatroom_id")
      .notNull()
      .references(() => chatroomTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    content: varchar("broadcast").notNull(),
  },
  (table) => ({
    displayIdIndex: index("chatroomID").on(table.chatroom),
  }),
);

