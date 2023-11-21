"use client"
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import { Button } from "@/components/ui/button";
import { AiOutlineSend } from "react-icons/ai";
import type { KeyboardEvent } from "react";
import { useState } from "react";
import useMessage from "@/hooks/useMessage";

type MessageProps = {
  userId: string
  chatroom: string;
};

function Message({userId, chatroom}: MessageProps) {
  const [content, setContent] = useState("");
  const { postMessage } = useMessage();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Check if the Enter key is pressed
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of Enter key in a textarea
      if (content=="") {
        return;
      }
      try {
        postMessage({
          chatroom,
          userId,
          content,
        });
        setContent("");
      } catch (e) {
        console.error(e);
        alert("Error posting chat");
      }
    }
  };

  return (
  <>
  
    <div className="flex mx-6 gap-2 bg-gray-300 p-1 rounded-2xl">
      <Button
        variant={"ghost"}
        type={"submit"}
        className="hover:bg-slate-200"
      >
        <AiOutlineSend  className="text-2xl text-gray-600 "/>
      </Button>
      <input 
       className="flex flex-grow bg-transparent rounded-2xl"
       style={{ outline: 'none', border: 'none' }}
       placeholder="Enter Message......"
       value={content}
       onChange={(e)=>setContent(e.target.value)}
       onKeyDown={handleKeyDown}
       >
      </input>
    </div>

  </>
  );
}

export default Message;