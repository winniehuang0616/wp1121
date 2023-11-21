import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import { RxAvatar } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { eq, asc, isNull } from "drizzle-orm";
import { db } from "@/db";
import { chatTable, chatroomTable, usersTable, broadcastTable } from "@/db/schema";

import Chat from "./_components/Chat";
import Message from "./_components/Message";

type HomePageProps = {
  params: { docId: string };
};

async function DocPage ({
  params: { docId },
}: HomePageProps) {
// 
  const session = await auth();
    if (!session || !session?.user?.id) {
      redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
    }
  const userId = session.user.id;
  const username = session.user.username;

  const broadcast = await db
    .select({
      broadcast: broadcastTable.content
    })
    .from(broadcastTable)
    .where(eq(broadcastTable.chatroom, docId))
    .execute();  

  const chats = await db
    .select({
      id: chatTable.id,
      userId: chatTable.userId,
      content: chatTable.content,
      cancel: chatTable.cancel
    })
    .from(chatTable)
    .orderBy(asc(chatTable.createdAt))
    .where(eq(chatTable.chatroom, docId))
    .execute();  
  
  // get chater's name
  const chater1 = await db
    .select({
      username: usersTable.username,
    })
    .from(chatroomTable)
    .leftJoin(usersTable, eq(chatroomTable.userId1, usersTable.displayId))
    .where(eq(chatroomTable.displayId, docId))
    .execute();

  const chater2 = await db
    .select({
      username: usersTable.username,
    })
    .from(chatroomTable)
    .leftJoin(usersTable, eq(chatroomTable.userId2, usersTable.displayId))
    .where(eq(chatroomTable.displayId, docId))
    .execute();

  // Extract username values from the results
  const chater1name = chater1[0]?.username;
  const chater2name = chater2[0]?.username;

  // Find the chater whose username is not equal to the current username
  const Chater = [chater1name, chater2name].find(chater => chater !== username);
  
  return (
  <>
    <div className="overflow-x-hidden h-screen mb-6 relative w-full">
      <div className="flex items-center gap-2 ml-6 mt-6">
        <RxAvatar className="text-4xl font-semibold text-sky-400"/>
        <h1 className="text-2xl font-bold">{Chater}</h1>
      </div>

      {broadcast && broadcast.length > 0 ? (
        <div className="flex items-center mt-5 mx-10 mb-8 gap-1 bg-gray-200 p-1 rounded-2xl">
        <Button
          variant={"ghost"}
          type={"submit"}
          className="hover:bg-slate-200"
        >
          <HiOutlineSpeakerphone className="text-xl text-gray-600 "/>
        </Button>
        <p className="p-1 font-bold">{broadcast[0].broadcast??""}</p>
        </div>
      ): (<></>)}

      <div className="grow">
        {chats.map((chat)=>(
          <Chat
            key={chat.id}
            chatroom={docId}
            id={chat.id}
            senderId={chat.userId}
            userId={userId}
            content={chat.content}
            cancel={chat.cancel}
            broadcast={broadcast && broadcast[0] ? broadcast[0].broadcast : null}
          />
        ))}
      </div>
      
      <div className="grow w-full">
        <Message 
        userId={userId}
        chatroom={docId}
        />
      </div>

    </div>
    
  </>
  );
}

export default DocPage;
