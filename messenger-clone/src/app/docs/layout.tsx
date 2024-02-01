import Slide from "./_components/Slide";
import Middle from "./_components/Middle";

type Props = {
  children: React.ReactNode;
};

function DocsLayout({ children }: Props) {
  
  return (
    <main className="flex-rows fixed  flex h-screen min-h-screen w-full">
      <nav className="flex w-1/4 flex-col min-h-screen border-r">
        <Slide/>
      </nav>
      <nav className="flex w-2/5 flex-col border-r">
        <Middle/>
      </nav>
      <div className="w-full overflow-y-scroll">{children}</div>
    </main>
  );
}

export default DocsLayout;
