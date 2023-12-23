import React from "react";
import { fetchUser } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { parser } from "@/lib/parser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import Image from "next/image";
import TreadsTab from "@/components/shared/TreadsTab";
import { fetchCommunityDetails } from "@/lib/actions/community.actions"; 
import UsersList from "@/components/lists/UsersList";
const Page = async ({ params }: { params: { id: string } }) => {
  const user = parser(await currentUser());
  if (!user) return null;
  const userInfo: { _id: string; onboarded: boolean } & any = parser(
    await fetchUser(params.id)
  );
  if (userInfo && !userInfo.onboarded) redirect("/onboarding");

  const communityDetails = parser(await fetchCommunityDetails(params.id));

  return (
    <section>
      <ProfileHeader
        user={{
          id: communityDetails.id,
          name: communityDetails.name,
          username: communityDetails.username,
          image: communityDetails.image,
          bio: communityDetails.bio,
        }}
        type="Community"
        authUserId={user.id}
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => {
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
                      {communityDetails?.threads?.length}
                    </p>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <TabsContent value={"threads"} className="w-full text-light-1 ">
            <TreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType="Community"
            />
          </TabsContent>{" "}
          <TabsContent value={"members"} className="w-full text-light-1 ">
            <UsersList users={communityDetails?.members} />
          </TabsContent>
          <TabsContent
            value={"requests"}
            className="w-full text-light-1 "
          ></TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Page;
