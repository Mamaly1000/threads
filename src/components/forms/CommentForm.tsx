"use client";
import { CommentValidation } from "@/lib/validations/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { addReplyToThread } from "@/lib/actions/thread";
const CommentForm = ({
  threadId,
  user,
}: {
  threadId: string;
  user: { image: string; id: string };
}) => {
  const path = usePathname();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
      accountId: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addReplyToThread({
      commentText: values.thread,
      path,
      threadId: threadId,
      userId: user.id,
    }).then(() => {
      form.reset();
      alert("thanks for your reply!");
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex justify-start items-center gap-3 w-full">
              <FormLabel>
                <Image
                  src={user.image}
                  alt="user image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  className="text-light-1 border-none no-focus outline-none"
                  placeholder="Comment...."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500 comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
