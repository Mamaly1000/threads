import React from "react";
import UserCard from "../cards/UserCard";

const UsersList = ({
  users,
}: {
  users: {
    id: string;
    name: string;
    username: string;
    image: string;
  }[];
}) => {
  return (
    <div className="mt-14 flex flex-col gap-9">
      {users.length > 0 ? (
        <>
          {users.map((user) => {
            return (
              <UserCard
                user={{
                  id: user.id,
                  name: user.name,
                  username: user.username,
                  image: user.image,
                }}
                UserType="User"
                key={user.id}
              />
            );
          })}
        </>
      ) : (
        <p className="no-result">No Users</p>
      )}
    </div>
  );
};

export default UsersList;
