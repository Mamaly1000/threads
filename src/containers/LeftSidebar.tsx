"use client";
import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import logout from "@/assets/logout.svg";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = useCallback(
    (link: string) => {
      if ((pathname.includes(link) && link.length > 1) || pathname === link) {
        return true;
      }
      return false;
    },
    [router, pathname]
  );
  return (
    <section className="leftsidebar custom-scrollbar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          return (
            <Link
              href={link.route}
              key={link.label}
              className={twMerge(
                `leftsidebar_link`,
                isActive(link.route) ? "bg-primary-500" : ""
              )}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image src={logout.src} alt="logout" width={24} height={24} />
              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
