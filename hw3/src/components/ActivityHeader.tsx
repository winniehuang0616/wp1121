'use client'
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";
import useComment from "@/hooks/useComment";
import useJoin from "@/hooks/useJoin";

type ActivityHeaderProps = {
  activityID: number;
  name: string;
  joins: number;
  joined: boolean;
  startTime: Date;
  endTime: Date;
  user: string;
  handle: string;
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function ActivityHeader({ 
  activityID,
  name,
  joins,
  joined,
  startTime,
  endTime,
  user,
  handle
  }: ActivityHeaderProps) {
  
  const [join, setJoin] = useState(joined);
  const [comment, setComment] = useState("");
  const { postComment } = useComment();
  const { postJoin, deleteJoin } = useJoin();
  console.log(join,user);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the Enter key is pressed
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of Enter key in a textarea
      handleSave(); // Call your save function here
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value); // Update the comment state as the user types
  };

  const handleSave = () => {
    const content = comment;
    if (!content ) {
      alert("請輸入留言");
      return;
    }
    try {
      postComment({
        activityID,
        handle,
        content,
      });
      setComment("");
    } catch (e) {
      console.error(e);
      alert("Error posting comment");
    }
  }

  const handleClick = async() => {
    if (!handle) return;
    if (join) {
      await deleteJoin({
        handle,
        activityID
      });
      setJoin(false)
    } else {
      await postJoin({
        handle,
        activityID
      });
      setJoin(true)
    }
  };

  return (
    <>
      <div className="w-100 h-1/5 mx-5 my-5">
        <div className="flex">
          <div className="w-4/5 mr-5 bg-slate-300 rounded-xl p-4">
            <div className="flex mb-3">
              <Link href={{ pathname: "/", query: { username:user, handle } }}>
                <ArrowLeft size={18} />
              </Link>
              <div className="mr-auto font-bold">{name}</div>
              <div className="font-bold">{joins}人參加</div>
            </div>
            <Separator/>
            <div className="mt-3">
            From{" "}
            <span className="font-bold text-gray-800">
              {dayjs(startTime).format("YYYY/MM/DD HH")}
            </span>{" "}
            To{" "}
            <span className="font-bold text-gray-800">
              {dayjs(endTime).format("YYYY/MM/DD HH")}
            </span>
            </div>
          </div>
           {join ? (
              <button className="w-1/5 rounded-xl p-2 bg-slate-700 text-white" onClick={handleClick}>已參加</button>
            ) : (
              <button className="w-1/5 border-2 border-black rounded-xl p-2" onClick={handleClick}>我要參加</button>
            )}
          
        </div>
          {join ? (
          <div className="p-2 font-bold mt-3 text-center">
          ========================== {user}留下你的想法 ===========================
          </div>
          ) : (
          <div className="p-2 font-bold mt-3 text-center">
          =========================== 參加活動來加入討論吧 ===========================
          </div>
          )}
        {join ? (
        <div className="mx-1 my-2 border-b border-black p-2 bg-white flex items-start">
          <span>{user}：</span>{"   "}
          <textarea
            placeholder="請輸入你的留言"
            value={comment}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="p-2 flex-1 w-32"
          />
        </div>
        ) : (<></>)}      
      </div>
    </>
  );
}
