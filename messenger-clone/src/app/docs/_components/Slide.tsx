import { RxAvatar } from "react-icons/rx";
import { LuMessagesSquare } from "react-icons/lu";
import { IoExitOutline } from "react-icons/io5";

import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import Image from "next/image";

async function Slide() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
 
  return (
    <nav className="flex-col h-screen w-full relative">
      <div className="flex my-10 ml-6 mb-2">
        <Image src="/messenger.png" alt="messenger icon" width={50} height={50} />
      </div>
      <div className="flex ml-6 gap-2 my-10">
        <LuMessagesSquare className="text-4xl text-sky-400 "/>
        <span className="text-sky-400 font-semibold mt-1">Chat</span>
      </div>
      <div className="flex w-full items-center justify-between px-3 absolute inset-x-0 bottom-5">
        <div className="flex items-center gap-2 ml-2">
          <RxAvatar />
          <h1 className="text-3x1 font-semibold">
            {session?.user?.username ?? "User"}
          </h1>
        </div>
        <Link href={`/auth/signout`}>
          <Button
            variant={"ghost"}
            type={"submit"}
            className="hover:bg-slate-200"
          >
            <IoExitOutline className="text-2xl text-slate-400 "/>
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Slide;