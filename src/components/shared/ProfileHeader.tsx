"use client";
import Image from "next/image";
import React from "react";

const ProfileHeader = ({
  user,
  authUserId,
}: {
  user: {
    id: string;
    name: string;
    username: string;
    image: string;
    bio: string;
  };
  authUserId: string;
}) => {
  return (
    <div className="flex w-full flex-col justify-start ">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={user.image}
              fill
              className="rounded-full object-cover shadow-2xl "
              alt={user.username}
            />
          </div>
          <div className="flex-1 ">
            <h2 className="text-left text-heading3-bold text-light-1 capitalize">
              {user.name}
            </h2>
            <p className="text-base-medium text-gray-1">@{user.username}</p>
          </div>
        </div>
      </div>
        {"todo => community"}
        <p className="mt-6 max-w-lg text-base-regular text-light-2">
          {user.bio}
        </p>
        <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
