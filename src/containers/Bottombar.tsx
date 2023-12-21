"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { twMerge } from "tailwind-merge";

const Bottombar = () => {
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
    <section className="bottombar ">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          return (
            <Link
              href={link.route}
              key={link.label}
              className={twMerge(
                `bottombar_link`,
                isActive(link.route) ? "bg-primary-500" : ""
              )}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 text-subtle-medium max-sm:hidden line-clamp-1">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
