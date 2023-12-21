"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "@Models/thread.model";

export async function createThread({
  text,
  path,
  communityId,
  author,
}: {
  text: string;
  path: string;
  communityId: string | null;
  author: string;
}) {
  await connectToDB();
  const createdThread = await Thread.create({
    text,
    author,
    community: null,
  });
  //   todo => update user modal
  await User.findByIdAndUpdate(author, {
    $push: {
      threads: createdThread._id,
    },
  });
  revalidatePath(path);
}
