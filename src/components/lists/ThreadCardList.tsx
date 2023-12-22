import React from "react";
import ThreadCard from "../cards/ThreadCard";

const ThreadCardList = ({
  user,
  List,
  account,
}: {
  account?: {
    name: string;
    id: string;
    image: string;
  };
  user: { _id: string };
  List: any[];
}) => {
  return (
    <section className="mt-9 flex flex-col gap-10 ">
      {List.length > 0 ? (
        List.map((thread) => {
          return (
            <ThreadCard
              thread={{
                id: thread._id,
                currentUserId: user._id,
                parentId: thread.parentId,
                content: thread.text,
                author: account
                  ? { name: account.name, id: account.id, image: account.image }
                  : thread.author,
                community: thread.community,
                createdAt: thread.createdAt,
                comments: thread.children,
              }}
              key={thread._id}
            />
          );
        })
      ) : (
        <p className="no-result">No threads found</p>
      )}
    </section>
  );
};

export default ThreadCardList;
