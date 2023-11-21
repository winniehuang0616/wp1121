"use client"
import { RxAvatar } from "react-icons/rx";
import React, { useState } from 'react';
import useMessage from "@/hooks/useMessage";
import useBullen from "@/hooks/useBullen";

type chatProps = {
  chatroom: string
  id: number;
  senderId: string;
  userId: string;
  content: string;
  cancel: string;
  broadcast: string|null;
};

function Chat({ 
  chatroom,
  id,
  senderId,
  userId,
  content,
  cancel,
  broadcast
}: chatProps) {

  const [click, setClick] = useState(false);
  const { deleteMessage, updateMessage } = useMessage();
  const { postBullen, updateBullen } = useBullen();

  const handleClick = async() => {
    if (click) {
      setClick(false)
    } else {
      setClick(true)
    }
  };

  const handleDelete = (id:number, userId:string) => {
    // Check if the Enter key is pressed
    try {
      deleteMessage({
        id,
        userId
      });
    } catch (e) {
      console.error(e);
      alert("Error deleting chat");
    }
  }

  const handleUpdate = (id:number) => {
    try {
      updateMessage({
        id
      });
    } catch (e) {
      console.error(e);
      alert("Error deleting chat");
    }
  }

  const handelBroadcast = () => {
    if (broadcast) {
      updateBullen({chatroom, content})
    }
    else {
      postBullen({chatroom, content})
    }
  }

  return (
    <>
      {(cancel === "true" && senderId === userId) ? (
        <div className="flex w-full gap-3 ml-8 my-10" key={id} id={id.toString()}>
          <div className="absolute text-sm right-20">
            您已收回訊息
          </div>
        </div>
        ) : (
          <>
          {senderId === userId ? (
            <div
              key={id}
              id={id.toString()}
              className="relative w-full gap-3 my-10 cursor-pointer"
            >
                  {click && (
                    <div className="absolute right-20 -top-6 bg-black bg-opacity-75 rounded-x2 text-sm">
                      <button 
                        className="border border-white hover:bg-opacity-50 text-white py-1 px-2 rounded"
                        onClick={() => handleDelete(id, userId)}
                      >
                        對所有人收回
                      </button>
                      <button 
                        className="border border-white hover:bg-opacity-50 text-white py-1 px-2 rounded"
                        onClick={() => handleUpdate(id)}
                      >
                        對自己收回
                      </button>
                      
                      <button 
                        className="border border-white hover:bg-opacity-50 text-white py-1 px-2 rounded"
                        onClick={handelBroadcast}
                      >
                        設為公告
                      </button>
                    </div>
                  )}
                  <div className="flex w-full gap-3" onClick={handleClick}>
                    <div className="absolute text-sm bg-gray-200 rounded-2xl max-w-[50%] p-2 px-4 break-all right-20">
                      {content}
                    </div>
                    <RxAvatar className="absolute text-4xl text-gray-400 font-semibold right-8" />
                  </div>
                </div>
              ) : (
                <div key={id} id={id.toString()} className="flex w-full gap-3 ml-8 my-10">
                  <RxAvatar className="text-4xl text-sky-400 font-semibold" />
                  <div className="text-sm bg-sky-400 rounded-2xl max-w-[50%] p-2 px-4 break-all">
                    {content}
                  </div>
                </div>
          )}
        </>
      )}
    </>
  );
}

export default Chat;