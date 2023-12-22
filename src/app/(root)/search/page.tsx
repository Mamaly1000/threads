import UsersList from "@/components/lists/UsersList";
import { fetchUser, getUsers } from "@/lib/actions/user";
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
  const results = parser(
    await getUsers({
      userId: user.id,
      searchString: "",
    })
  );

  return (
    <section>
      <h1 className="head-text text-light-1">search</h1>
      {/* <SearchBar /> */}
      <UsersList users={results.users || []} />
    </section>
  );
};

export default Page;
