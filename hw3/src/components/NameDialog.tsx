"use client";

import { useRef } from "react";
import useActivity from "@/hooks/useActivity";
import useJoin from "@/hooks/useJoin";

// all components is src/components/ui are lifted from shadcn/ui
// this is a good set of components built on top of tailwindcss
// see how to use it here: https://ui.shadcn.com/
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { setDefaultResultOrder } from "dns";


type NameDialogProps = {
  handle: string | null;
  activity: boolean;
  setActivity: ()=>void;
}

export default function NameDialog({handle, activity, setActivity}:NameDialogProps ) {
  const activityInputRef = useRef<HTMLInputElement>(null);
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);
  const { postActivity } = useActivity();
  const { postJoin } = useJoin();

  

  const handleSave = async () => {
    const activityName = activityInputRef.current?.value;
    const startTimeInput = startInputRef.current?.value;
    const endTimeInput = endInputRef.current?.value;

    if (!activityName || !startTimeInput || !endTimeInput) {
      alert("欄位不可為空");
      return;
    }

    // 檢查是否為合法日期與時間，調整成 YYYY/MM/DD HH:MM:SS
    function formatDateTime(dateTimeString:string) {

      const dateObj = dateTimeString.split(/[./\s]+/);
    
      var limitInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var theYear = parseInt(dateObj[0]);
      var theMonth = parseInt(dateObj[1]);
      var theDay = parseInt(dateObj[2]);
      var theHour = parseInt(dateObj[3]);
      var isLeap = new Date(theYear, 1, 29).getDate() === 29;
    
      if (isLeap) {
        limitInMonth[1] = 29;
      }
    
      if (!theYear || !theMonth || !theDay || !theHour) {
        alert("請輸入年/月/日 小時");
      } else if (
        theDay > limitInMonth[theMonth - 1] ||
        theYear > 2023 ||
        theMonth < 1 ||
        theMonth > 12 || 
        theHour < 1 ||
        theHour > 24
      ) {
        alert("無效日期，請修正");
      } else {
        var year = theYear.toString();
        var month = theMonth.toString().padStart(2, "0");
        var day = theDay.toString().padStart(2, "0");
        var hour = theHour.toString().padStart(2, "0");
        return `${year}/${month}/${day} ${hour}:00:00`;
      }
    }
  
    const formatStartTime = formatDateTime(startTimeInput);
    const formatEndTime = formatDateTime(endTimeInput);

    if (!formatStartTime || !formatEndTime) {return;}

    const startDate = new Date(formatStartTime).getTime();;
    const endDate = new Date(formatEndTime).getTime();;

    if (startDate >= endDate) {
      alert("開始時間應早於結束時間");
      return;
    }

    const maxDurationInDays = 7;
    const maxDurationInMilliseconds = maxDurationInDays * 24 * 60 * 60 * 1000;

    if (endDate - startDate > maxDurationInMilliseconds) {
      alert("開始與結束時間相差最多 7 天");
      return;
    }

    const dateFormat = "yyyy/MM/dd HH:mm:ss";
    const startTime = format(startDate, dateFormat);
    const endTime = format(endDate, dateFormat);
    console.log(startTime, endTime);
    
    if (!handle) {
      alert("請先登入或註冊");
      return;
    }
  
    try {
      const id = await postActivity({
        activityName,
        startTime,
        endTime,
      });

      await postJoin({
        handle,
        activityID: id,
      });
      
    } 
      
    catch (e) {
      console.error(e);
      alert("Error posting join");
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
            <div className="col-span-3 flex items-center gap-2">
            <Input
              placeholder="活動名稱"
              ref={activityInputRef}
            />
            </div>
          
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
