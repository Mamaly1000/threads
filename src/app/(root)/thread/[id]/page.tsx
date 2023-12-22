import ThreadCard from "@/components/cards/ThreadCard";
import ReplyCardList from "@/components/lists/ReplyCardList";
import { getThreadById } from "@/lib/actions/thread";
import { fetchUser } from "@/lib/actions/user";
import { parser } from "@/lib/parser";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const userInfo = await fetchUser(user?.id);
  if (!userInfo.onboarded) redirect("/onboarding");
  const thread: any = await getThreadById(params);
  if (!thread) return null;

  const parsedUser = parser(userInfo);
  const parsedThread = parser(thread);
  return (
    <section className="relative">
      <div className="">
        <ThreadCard
          thread={{
            id: parsedThread._id,
            currentUserId: parsedUser._id,
            parentId: parsedThread.parentId,
            content: parsedThread.text,
            author: parsedThread.author,
            community: parsedThread.community,
            createdAt: parsedThread.createdAt,
            comments: parsedThread.children,
          }}
        />
      </div>
      <ReplyCardList
        threadId={parsedThread._id}
        replies={parsedThread.children}
        user={{ id: parsedUser._id, image: parsedUser.image }}
        displayCommentSection={true}
      />
    </section>
  );
};

export default Page;
