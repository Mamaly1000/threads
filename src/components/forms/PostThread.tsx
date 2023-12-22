"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ThreadValidation } from "@/lib/validations/thread";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Button } from "../ui/button"; 
import { Textarea } from "../ui/textarea"; 
import { usePathname, useRouter } from "next/navigation";
import { createThread } from "@/lib/actions/thread";
const PostThread = ({ userId }: { userId: string }) => {
  const path = usePathname();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      author: userId,
      text: values.thread,
      communityId: null,
      path,
    }).then(() => {
      alert("thread created successfully!");
    });
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 justify-start mt-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start gap-3 w-full">
              <FormLabel className="  text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="flex-1 no-focus border border-dark-4 bg-dark-3 text-light-1 text-base-semibold">
                <Textarea rows={15} {...field} className="text-light-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Post Thread
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
