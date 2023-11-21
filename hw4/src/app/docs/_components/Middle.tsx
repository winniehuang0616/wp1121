import { RxAvatar } from "react-icons/rx";
import { MdPersonAddAlt1, MdDelete } from "react-icons/md";
import { redirect} from "next/navigation";
import { revalidatePath } from "next/cache";
import React from 'react';
import { useSearchParams, useRouter} from 'next/navigation';
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import Link from "next/link";
import { getChatroom, createChatroom, deleteChatroom } from "./actions";
import Search from "./Search"

async function Middle()
{
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }

  let search = ""
  const userId = session.user.id;
  const chatrooms = await getChatroom(userId, search);
 
  const create = async (userId1:string, userId2:string) => {
    "use server";
    const newChatroomId = await createChatroom(userId1, userId2);
    revalidatePath("/docs");
  };

  return (
    <div className="flex-col h-screen w-full relative bg-gray-100">
      <div className="flex mt-6 ml-6 gap-2">
        <span className="text-2xl font-bold">Chat</span>
        <Button
          variant={"ghost"}
          type={"submit"}
          className="hover:bg-slate-200 absolute inset-y-5 right-4"
        >
          <MdPersonAddAlt1 className="text-3xl text-slate-400 "/>
        </Button>
      </div>

      <Search />

      <div>
      {chatrooms.map((room, i) => { 
        return (
        <>
        {room.chatroom === null ? (
          <div key={i} className="flex w-7/8 p-2 item-center gap-2 mx-6 mb-1 hover:bg-sky-200 rounded-2xl cursor-pointer">
            <RxAvatar className="text-4xl mt-1 text-gray-400" />
            <div className="flex-col">
              <h1 className="text-base font-bold text-left">
                {room.username}
              </h1>
              <p className="text-sm text-slate-600">add a chatroom</p>
            </div>
            <form
              action={async () => {
              "use server";
              await createChatroom(userId, room.userId);
              revalidatePath("/docs");
              }}
            >
              <Button
                variant={"ghost"}
                type={"submit"}
                className="hover:bg-white/50 absolute right-8 rounded-full"
              >
                <MdPersonAddAlt1 className="text-3xl text-slate-400 "/>
              </Button>
           </form> 
          </div>
          ) : (
          
          <div className="flex w-7/8 p-2 gap-2 mx-6 mb-1 hover:bg-sky-200 rounded-2xl cursor-pointer">
            <RxAvatar className="text-4xl mt-1 text-sky-400" />
            
            <div className="flex-col">
            <Link href={`/docs/${room.chatroom}`}>
              <h1 className="text-base font-bold text-left">
                {room.username}
              </h1>
              <p className="text-sm text-slate-600">{room.content}</p>
            </Link>
            </div>
            
            <form
              action={async () => {
                "use server";
                if (room.chatroom !== null) {
                  await deleteChatroom(room.chatroom);
                  revalidatePath("/docs");
                }
              }}
            >
              <Button
                variant={"ghost"}
                type={"submit"}
                className="hover:bg-white/50 absolute right-8 rounded-full"
              >
                <MdDelete className="text-3xl text-slate-400 "/>
              </Button>
           </form>
          </div>
          
        )}
        </>
        )
      })}
      </div>

      

      

    </div>
  );
}

export default Middle;