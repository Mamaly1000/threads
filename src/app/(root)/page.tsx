import ReplyCardList from "@/components/lists/ReplyCardList";
import ThreadCardList from "@/components/lists/ThreadCardList";
import { GetThreads } from "@/lib/actions/thread";
import { fetchUser } from "@/lib/actions/user";
import { parser } from "@/lib/parser";
import { UserButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = parser(await currentUser());
  if (!user) redirect("/sign-in");
  const userInfo = parser(await fetchUser(user?.id));
  if (userInfo&&!userInfo.onboarded) redirect("/onboarding");
  const threads = parser(await GetThreads({}));

  return (
    <div className="min-h-screen  p-5">
      <h1 className="head-text text-left">Home</h1>
      <ThreadCardList
        user={JSON.parse(JSON.stringify(userInfo))}
        List={threads.threads || []}
      />
    </div>
  );
}
