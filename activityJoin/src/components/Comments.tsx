'use client'

type CommentsProps = {
  user: string | null;
  content: string | null;
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function Comments({ user, content }: CommentsProps) {
  
  return (
    <div className="mx-6 my-2 border-b border-black p-2 bg-slate-50 flex items-start break-words">
      <span className="font-bold mr-2">{user}:</span>
      <div className="flex-1 w-32">{content}</div>
    </div>
  );
}
