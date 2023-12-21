import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/containers/Topbar";
import LeftSidebar from "@/containers/LeftSidebar";
import RightSidebar from "@/containers/RightSidebar";
import Bottombar from "@/containers/Bottombar";
import logo from "@/assets/logo.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wellcome to threads",
  description: "Wellcome to threads",
  icons: logo.src,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />
          <main className="flex flex-row" >
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
