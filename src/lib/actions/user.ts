"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import User from "@Models/user.model";
export async function updateUser({
  userID,
  username,
  name,
  image,
  bio,
  path,
}: {
  userID?: string;
  username: string;
  name: string;
  image?: string;
  bio?: string;
  path: string;
}): Promise<void> {
  await connectToDB();
  if (!userID) {
    throw new Error("Invalid ID!");
  }
  try {
    await User.findOneAndUpdate(
      {
        id: userID,
      },
      {
        username: username.toLowerCase(),
        name: name,
        bio: bio || null,
        image: image || null,
        onboarded: true,
      },
      {
        upsert: true,
      }
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error("Failed to create/update the user! : ", error.message);
  }
}
export async function fetchUser(id: string) {
  try {
    await connectToDB();
    const user = await User.findOne({ id });
    // .populate({
    //   path: "communities",
    //   model: "COMMUNITY",
    // });
    return user;
  } catch (error) {
    console.log("fetch user error :", error);
  }
}
