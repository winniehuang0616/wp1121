import Link from "next/link";

type ActivityProps = {
  id: number;
  name: string;
  joins: number;
  joined: boolean;
  user?: string;
  handle?: string;
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function Activity({ 
  id,
  name,
  joins,
  joined,
  user,
  handle
}: ActivityProps) {
  console.log(joins, joined);
  return (
    <>
      <Link
        className="w-full pt-3 transition-colors hover:bg-gray-50"
        href={{
          pathname: `/activity/${String(id)}`,
          query: {
            username:user,
            handle,
          },
        }}
      >
      <div className="flex items-center rounded-xl bg-slate-300 h-16 mx-5 px-10 mb-5 ">
        <div className="w-9/12">{name}</div>
        {joined?(<div className="w-1/12">v</div>):(<div className="w-1/12"></div>)}
        <div className="w-2/12">{joins ?? 0}人參加</div>
      </div>
      </Link>
    </>
  );
}
