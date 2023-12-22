import React from "react";
import CommentForm from "../forms/CommentForm";
import ThreadCard from "../cards/ThreadCard";

const ReplyCardList = ({
  replies,
  displayCommentSection = false,
  threadId,
  user,
}: {
  replies: any[];
  displayCommentSection?: boolean;
  threadId: string;
  user: { image: string; id: string };
}) => {
  return (
    <div className="mt-7 ">
      {displayCommentSection && <CommentForm threadId={threadId} user={user} />}
      {replies.length > 0 && (
        <div className="mt-10">
          {replies.map((rep) => {
            return (
              <ThreadCard
                thread={{
                  id: rep._id,
                  currentUserId: user.id,
                  parentId: rep.parentId,
                  content: rep.text,
                  author: rep.author,
                  community: rep.community,
                  createdAt: rep.createdAt,
                  comments: rep.children,
                  isComment: true,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReplyCardList;
