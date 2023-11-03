import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";


import { Separator } from "@/components/ui/separator";

// import global styles for tailwind to work
import "./globals.css";

// nextjs provides helper functions to load google fonts
// read more about fonts in nextjs here:
// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#google-fonts
const noto = Noto_Sans({
  subsets: ["latin-ext"],
  weight: ["400", "700"],
  // we can reference the font in our css using the name we provided here
  variable: "--noto-sans",
});

// nextjs provides a way to set metadata for the page
// read more about metadata helpers in nextjs here:
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Join me",
  description: "Generated by create next app",
  icons: "/favicon.ico",
};

// The root layout is the outermost component that wraps all pages
// this prevents us from having to repeat the same layout code in every page
// it also prevents us from loading redundant javascript in every page
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* this applies the font to the whole page */}
      <body className={noto.className}>
        <div className="mx-52 my-10 border-4 border-black rounded-xl">
          <main className="min-h-screen w-full">
            {children}
          </main>
          
        </div>
      </body>
    </html>
  );
}
