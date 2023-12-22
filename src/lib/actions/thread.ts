"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "@Models/thread.model";
import { ThreadType } from "@/types/thread";

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
  try {
    await connectToDB();
    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });
    //   todo => update user model
    await User.findByIdAndUpdate(author, {
      $push: {
        threads: createdThread._id,
      },
    });
    revalidatePath(path);
  } catch (error) {
    console.log("Error creating thread :", error);
  }
}
export async function GetThreads(params: { limit?: number; page?: number }) {
  try {
    let query: any = {
      limit: 20,
      page: 1,
    };
    if (params.limit) {
      query.limit = params.limit;
    }
    if (params.page) {
      query.page = params.page;
    }
    const skipAmount = (query.page - 1) * query.page;
    await connectToDB();
    const threadsQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(query.limit)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalThreadsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });
    const threads = await threadsQuery.exec();
    const isNext = totalThreadsCount > skipAmount + threads.length;

    return {
      threads,
      isNext,
    };
  } catch (error) {
    console.log("Error getting threads :", error);
  }
}
export async function getThreadById(params: { id: string }) {
  try {
    await connectToDB();
    //  todo => populate communities
    const thread = await Thread.findById(params.id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name image",
            },
          },
        ],
      })
      .exec();
    return thread;
  } catch (error) {
    console.log("Error in getThreadById :", error);
  }
}
export async function addReplyToThread({
  threadId,
  commentText,
  userId,
  path,
}: {
  threadId: string;
  commentText: string;
  userId: string;
  path: string;
}) {
  try {
    await connectToDB();
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create the new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId, // Set the parentId to the original thread's ID
    });

    // Save the comment thread to the database
    const savedCommentThread = await commentThread.save();

    // Add the comment thread's ID to the original thread's children array
    originalThread.children.push(savedCommentThread._id);

    // Save the updated original thread to the database
    await originalThread.save();

    revalidatePath(path);
  } catch (error) {
    console.log("Error in Replying a Thread :", error);
  }
}
