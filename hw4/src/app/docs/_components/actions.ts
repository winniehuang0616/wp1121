"use server"
import { eq, like, and, ne, sql } from "drizzle-orm";
import { union } from 'drizzle-orm/pg-core';

import { db } from "@/db";
import { chatroomTable, usersTable, chatTable } from "@/db/schema";

export const createChatroom = async (userId1: string, userId2: string) => {
  console.log("[createChatroom]");
  
  const [newChatroom] = await db
    .insert(chatroomTable)
    .values({
      userId1: userId1,
      userId2: userId2,
    })
    .returning();
   
  return newChatroom.displayId;
};

export const getChatroom = async (userId: string, search:string|null|undefined) => {
  const chatroomSubquery1 = 
    db
      .select({
        displayID: chatroomTable.displayId,
        userId: chatroomTable.userId2,
      })
      .from(chatroomTable)
      .where(eq(chatroomTable.userId1, userId))

  const chatroomSubquery2 = 
    db
    .select({
      displayID: chatroomTable.displayId,
      userId: chatroomTable.userId1,
    })
    .from(chatroomTable)
    .where(eq(chatroomTable.userId2, userId))

  const chatroomSubquery = db
  .$with("chatroomSubquery")
  .as(union(chatroomSubquery1, chatroomSubquery2));

  const chatSubquery = db
  .$with("chatSubquery").as(
    db.select({
      chatroom: chatTable.chatroom,
      latestCreatedAt: sql`MAX(created_at)`.as("latestCreatedAt"),
    })
    .from(chatTable)
    .groupBy(chatTable.chatroom)
  );

  const lastchatSubquery =  db
  .$with("lastchatSubquery").as(
  db.with(chatSubquery)
  .select({
    chatroom: chatSubquery.chatroom,
    content: chatTable.content,
  })
  .from(chatTable)
  .innerJoin(chatSubquery, and(
    eq(chatTable.chatroom,chatSubquery.chatroom),
    eq(chatTable.createdAt, chatSubquery.latestCreatedAt)
  )));


  const Chatroom = await db
    .with(chatroomSubquery, lastchatSubquery)
    .select({
      username: usersTable.username,
      userId: usersTable.displayId,
      displayID: usersTable.displayId,
      chatroom: chatroomSubquery.displayID,
      content: lastchatSubquery.content
    })
    .from(usersTable)
    .leftJoin(chatroomSubquery, eq(usersTable.displayId, chatroomSubquery.userId))
    .leftJoin(lastchatSubquery, eq(chatroomSubquery.displayID, lastchatSubquery.chatroom))
    .where(
      search
        ? (
            like(usersTable.username, `%${search}%`)
        )  
        : and(
          ne(usersTable.displayId, userId), // Exclude the row where displayId matches userId
        )
      )
    .execute();   
  return Chatroom;
};

export const deleteChatroom = async (chatroomID: string) => {
  console.log("[deleteChatroom]");
  await db
    .delete(chatroomTable)
    .where(eq(chatroomTable.displayId, chatroomID));
  return;
};
