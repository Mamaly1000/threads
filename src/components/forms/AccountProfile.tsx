"use client";
import React from "react";
const AccountProfile = ({
  user,
  btnTitle,
}: {
  user: {
    id: string | undefined;
    objectId: string;
    username: any;
    name: any;
    bio: any;
    image: any;
  };
  btnTitle: string;
}) => {
  return <div>Account profile</div>;
};

export default AccountProfile;
