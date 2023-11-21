import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import { RxAvatar } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { AiOutlineSend } from "react-icons/ai";
import Middle from "./_components/Middle";

type Props = {
  searchParams: {
    search?: string | null | undefined;
  };
};

async function DocsPage({ searchParams:search }: Props) {
  console.log(search)
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  return (
    <>
    <div className="flex w-3/5 flex-col border-r">
      <div className="flex items-center gap-2 ml-6 mt-6">
        <RxAvatar className="text-4xl font-semibold text-sky-400"/>
      </div>
      <div className="flex absolute mt-5 mx-6 gap-2 bg-gray-200 p-1 rounded-2xl bottom-5 w-1/2 ">
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
        >
        </input>
      </div>
    </div>
    </>
  );
}
export default DocsPage;
