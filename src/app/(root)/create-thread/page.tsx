import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user?.id);
  if (userInfo && !userInfo.onboarded) redirect("/onboarding");
  return (
    <>
      <h1 className="head-text">create thread</h1>
      <PostThread userId={userInfo._id as string} />
    </>
  );
};

export default Page;
