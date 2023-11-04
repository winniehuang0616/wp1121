"use client";

import { useRef,useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useUserInfo from "@/hooks/useUserInfo";

import NameDialog from "./NameDialog";
import UserDialog from "./UserDialog";


export default function Header() {

  const [user, setUser] = useState(false);
  const [activity, setActivity] = useState(false);
  const { username, handle } = useUserInfo();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const search = searchInputRef.current?.value;
    const params = new URLSearchParams(searchParams);
    // validateUsername and validateHandle would return false if the input is
    // invalid, so we can safely use the values here and assert that they are
    // not null or undefined.
    params.set("search", search!);
    router.push(`${pathname}?${params.toString()}`);
    return true;
  };

  return (
    <>
      <div className="flex mx-5 my-5">
        <div className="mr-auto p-2 font-bold"> {username ?? "請登入或創建帳號"} </div>
        <button className="border-2 border-black rounded-xl p-2" onClick={()=>setUser(true)}>切換使用者</button>
      </div>
      <div className="mx-5">
        <Separator/>
      </div>
      <div className="flex mx-5 my-5">
        <div className="flex-grow mr-auto border-0.5 border-black rounded-xl">
          <input className="border-2 border-black rounded-xl p-2" type="text" id="searchInput" 
          placeholder="Search..." 
          ref={searchInputRef}
          />
          <button className="ml-2 p-2 border-2 border-black rounded-xl bg-slate-100" onClick={handleSearch}>Search</button>
        </div>
        <button className="border-2 border-black rounded-xl p-2" onClick={() => {setActivity(true)}}>新增</button>
      </div>
    <NameDialog
      handle={handle}
      activity={activity}
      setActivity={()=>setActivity(false)}
    />
    <UserDialog
      user={user}
      setUser={setUser}
    />
    </>
  );
}

