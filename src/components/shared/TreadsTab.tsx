import { getUsersThreads } from "@/lib/actions/user";
import { parser } from "@/lib/parser";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCardList from "../lists/ThreadCardList";

const TreadsTab = async ({
  accountId,
  accountType,
  currentUserId,
}: {
  currentUserId: string;
  accountId: string;
  accountType: "User";
}) => {
  const user = parser(await getUsersThreads({ userId: accountId }));
  if (!user) redirect("/");

  return (
    <ThreadCardList
      account={{
        id: user.id,
        name: user.name,
        image: user.image,
      }}
      List={user.threads}
      user={{ _id: currentUserId }}
    />
  );
};

export default TreadsTab;
