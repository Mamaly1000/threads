import ActivitiesList from "@/components/lists/ActivitiesList";
import { fetchUser, getActivities } from "@/lib/actions/user";
import { parser } from "@/lib/parser";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = parser(await currentUser());
  if (!user) return null;
  const userInfo: { _id: string; onboarded: boolean } & any = parser(
    await fetchUser(user.id)
  );
  if (userInfo && !userInfo.onboarded) redirect("/onboarding");
  const activities = parser(await getActivities({ userId: userInfo._id }));

  return (
    <section>
      <h1 className="head-text text-light-1">activity</h1>
      <ActivitiesList activities={activities || []} />
    </section>
  );
};

export default Page;
