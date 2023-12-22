"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const UserCard = ({
  user,
  UserType,
}: {
  UserType?: "User";
  user: {
    id: string;
    name: string;
    username: string;
    image: string;
  };
}) => {
  const router = useRouter();
  return (
    <article className="user-card">
      <div className="user-car_avatar">
        <Image
          src={user.image}
          alt={user.username}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex-1 text-ellipsis ">
          <h4 className="text-base-semibold text-light-1">{user.name}</h4>
          <p className="text-small-medium text-gray-1 ">@{user.username}</p>
        </div>
      </div>
      <Button
        className="user-card_btn"
        onClick={() => {
          router.push(`/profile/${user.id}`);
        }}
      >
        view
      </Button>
    </article>
  );
};

export default UserCard;
