import React from "react";
import CommunityCard from "../cards/CommunityCard";

const CommunitiesList = ({ communities }: { communities: any[] }) => {
  return (
    <section className="mt-14 flex flex-col gap-9">
      {communities.length > 0 ? (
        <>
          {communities.map((community) => {
            return (
              <CommunityCard
                community={{
                  id: community.id,
                  name: community.name,
                  username: community.username,
                  imgUrl: community.image,
                  bio: community.bio,
                  members: community.members,
                }}
                key={community.id}
              />
            );
          })}
        </>
      ) : (
        <p className="no-result">No Communities</p>
      )}
    </section>
  );
};

export default CommunitiesList;
