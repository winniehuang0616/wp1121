"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useActivity from "@/hooks/useActivity";

// all components is src/components/ui are lifted from shadcn/ui
// this is a good set of components built on top of tailwindcss
// see how to use it here: https://ui.shadcn.com/
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, validateHandle, validateUsername } from "@/lib/utils";

type NameDialogProps = {
  activity: boolean;
  setActivity: ()=>void;
}

export default function NameDialog({activity, setActivity}:NameDialogProps ) {
  const activityInputRef = useRef<HTMLInputElement>(null);
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);
  const { postActivity } = useActivity();

  const isValidTimeFormat = (time: string) => {
    const regex = /^\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/;
    return regex.test(time);
  };

  const handleSave = async () => {
    const activityName = activityInputRef.current?.value;
    const startTime = startInputRef.current?.value;
    const endTime = endInputRef.current?.value;
    if (!activityName || !startTime || !endTime) {
      alert("欄位不可為空");
      return;
    }
    if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
      alert("時間格式不正確");
      return;
    }
    else (console.log(activityName, startTime, endTime))

    try {
      await postActivity({
        activityName,
        startTime,
        endTime,
      });
    } catch (e) {
      console.error(e);
      alert("Error posting activity");
    }

  };

  return (
    <Dialog open={activity}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add An Activity</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              活動名稱
            </Label>
            <Input
              placeholder="活動名稱"
              ref={activityInputRef}
            />
          
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start-time" className="text-right">
              開始時間
            </Label>
            <div className="col-span-3 flex items-center gap-2">
            <Input
              placeholder="2023/10/22 15"
              ref={startInputRef}
            />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end-time" className="text-right">
              結束時間
            </Label>
            <div className="col-span-3 flex items-center gap-2">
            <Input
              placeholder="2023/10/22 17"
              ref={endInputRef}
            />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>新增</Button>
          <Button onClick={setActivity}>關閉</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
