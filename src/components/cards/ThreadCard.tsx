"use client";
import { ThreadType } from "@/types/thread";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import heart from "@/assets/heart-gray.svg";
import reply from "@/assets/reply.svg";
import share from "@/assets/share.svg";
import repost from "@/assets/repost.svg";
import moment from "moment";
import github from "@/assets/icons8-github-500.svg";
import { twMerge } from "tailwind-merge";
const ThreadCard = ({ thread }: { thread: ThreadType }) => {
  return (
    <article
      className={twMerge(
        "flex w-full flex-col rounded-xl ",
        thread.isComment ? "px-0 xs:px-7 " : " bg-dark-2 p-7 px-7 py-7 "
      )}
    >
      <div className="flex items-start justify-between ">
        <div className="flex w-full flex-1 flex-row gap-4 ">
          <div className="flex flex-col items-center ">
            <Link
              href={`/profile/${thread.author.id}`}
              className="relative h-11 w-11 "
            >
              <Image
                src={thread.author.image}
                alt={thread.author.name}
                fill
                className="cursor-pointer rounded-full object-contain ring-1 ring-primary-500 "
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${thread.author.id}`} className=" w-fit ">
              <h4 className=" cursor-pointer text-base-semibold text-light-1 capitalize">
                {thread.author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">
              {thread.content}
            </p>
            <div
              className={twMerge(
                "mt-5 flex flex-col gap-3",
                thread.isComment && "mb-10"
              )}
            >
              <div className="flex gap-3.5 ">
                <Image
                  src={heart.src}
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />{" "}
                <Link href={`/thread/${thread.id}`}>
                  <Image
                    src={reply.src}
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src={repost.src}
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />{" "}
                <Image
                  src={share.src}
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
              {thread.isComment && thread.comments.length > 0 && (
                <Link href={`/thread/${thread.id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {thread.comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {!thread.isComment && (
        <div className="text-gray-500 text-[.7rem] w-full mt-10 flex items-start justify-start gap-2 flex-row">
          {moment(thread.createdAt).format("HH:MM - MMM DD, YYYY")} -{" "}
          <Link href="https://github.com/Mamaly1000" className="flex gap-1">
            Developed By Mohammad Azizi{" "}
            <Image
              src={github.src}
              alt="my github"
              width={15}
              height={15}
              className="rounded-full object-center"
            />
          </Link>
        </div>
      )}
    </article>
  );
};

export default ThreadCard;
