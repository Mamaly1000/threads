"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import User from "@Models/user.model";
import Thread from "@Models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";
import Community from "../models/community.model";
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

    return await User.findOne({ id }).populate({
      path: "communities",
      model: Community,
    });
  } catch (error) {
    console.log("fetch user error :", error);
  }
}
export async function getUsersThreads({ userId }: { userId: string }) {
  try {
    if (!userId) {
      throw new Error("Invalid ID!");
    }
    await connectToDB();
    // todo : populate community
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "community",
          model: Community,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });
    return threads;
  } catch (error) {
    console.log("Error in geting users threads :", error);
  }
}
export async function getUsers({
  pagenumber = 1,
  searchString = "",
  userId,
  limit = 20,
  sortBy = "desc",
}: {
  sortBy?: SortOrder;
  limit?: number;
  userId: string;
  searchString?: string;
  pagenumber?: number;
}) {
  try {
    await connectToDB();
    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pagenumber - 1) * limit;
    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter users.
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }, // Exclude the current user from the results.
    };

    // If the search string is not empty, add the $or operator to match either username or name fields.

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }
    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(limit);

    // Count the total number of users that match the search criteria (without pagination).
    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();
    // Check if there are more users beyond the current page.
    const isNext = totalUsersCount > skipAmount + users.length;
    return {
      users,
      isNext,
    };
  } catch (error) {
    console.log("Error in getting all users in search :", error);
  }
}
export async function getActivities({ userId }: { userId: string }) {
  try {
    await connectToDB();
    // find all threads created by the user
    const userThreads = await Thread.find({ author: userId });

    // Collect all the child thread ids (replies) from the 'children' field of each user thread
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    // Find and return the child threads (replies) excluding the ones created by the same user
    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId }, // Exclude threads authored by the same user
    }).populate({
      path: "author",
      model: User,
      select: "_id id name image",
    });

    return replies;
  } catch (error) {
    console.log("Failed to fetch activity :", error);
  }
}
