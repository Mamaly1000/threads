import { getUsersThreads } from "@/lib/actions/user";
import { parser } from "@/lib/parser";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCardList from "../lists/ThreadCardList";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

const TreadsTab = async ({
  accountId,
  accountType = "User",
  currentUserId,
}: {
  currentUserId: string;
  accountId: string;
  accountType: "User" | "Community";
}) => {
  let results: any = [];
  if (accountType === "User") {
    results = parser(await getUsersThreads({ userId: accountId }));
  } else if (accountType === "Community") {
    results = parser(await fetchCommunityPosts(accountId));
  }
  if (!results) redirect("/");

  return (
    <ThreadCardList
      account={{
        id: results.id,
        name: results.name,
        image: results.image,
      }}
      List={results.threads}
      user={{ _id: currentUserId }}
    />
  );
};

export default TreadsTab;
