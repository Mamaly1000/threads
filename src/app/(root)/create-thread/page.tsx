import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user";
import { parser } from "@/lib/parser";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = parser(await currentUser());
  if (!user) return null;
  const userInfo: { _id: string; onboarded: boolean } = parser(
    await fetchUser(user?.id)
  );

  if (userInfo && !userInfo.onboarded) redirect("/onboarding");
  return (
    <>
      <h1 className="head-text capitalize">create thread</h1>
      <PostThread userId={JSON.parse(JSON.stringify(userInfo))._id} />
    </>
  );
};

export default Page;
