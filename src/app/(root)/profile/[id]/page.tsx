import React from "react";
import { fetchUser } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { parser } from "@/lib/parser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import TreadsTab from "@/components/shared/TreadsTab";
const Page = async ({ params }: { params: { id: string } }) => {
  const user = parser(await currentUser());
  if (!user) return null;
  const userInfo: { _id: string; onboarded: boolean } & any = parser(
    await fetchUser(params.id)
  );
  if (userInfo && !userInfo.onboarded) redirect("/onboarding");

  return (
    <section>
      <ProfileHeader
        user={{
          id: userInfo.id,
          name: userInfo.name,
          username: userInfo.username,
          image: userInfo.image,
          bio: userInfo.bio,
        }}
        authUserId={user.id}
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => {
              return (
                <TabsTrigger className="tab" value={tab.value} key={tab.label}>
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="max-sm:hidden">{tab.label}</p>
                  {tab.label === "Threads" && (
                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                      {userInfo?.threads?.length}
                    </p>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {profileTabs.map((tab) => {
            return (
              <TabsContent
                key={`content-${tab.label}`}
                value={tab.value}
                className="w-full text-light-1"
              >
                <TreadsTab
                  currentUserId={user.id}
                  accountId={userInfo.id}
                  accountType="User"
                />
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default Page;
