"use client";
import { MdOutlinePersonSearch } from "react-icons/md";
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

function Search() {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = () => {
        const search = searchInputRef.current?.value ?? ''; // Use an empty string as the default value
        const params = new URLSearchParams(searchParams);
        params.set("search", search!);
        router.push(`${pathname}?${params.toString()}`);
        return true;
    };

  return (
    
      <div className="flex mt-5 mx-6 mb-2 gap-2 bg-gray-300 p-1 rounded-2xl">
      <Button
        variant={"ghost"}
        type={"submit"}
        className="hover:bg-slate-200"
        onClick={handleSearch}
      >
        <MdOutlinePersonSearch className="text-2xl text-gray-600 "/>
      </Button>
      <input 
       className="flex bg-transparent rounded-2xl"
       style={{ outline: 'none', border: 'none' }}
       placeholder="Search User..."
       ref={searchInputRef}
       >
      </input>
      </div>
  );
}

export default Search;