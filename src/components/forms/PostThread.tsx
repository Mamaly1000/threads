"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ThreadValidation } from "@/lib/validations/thread";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useOrganization } from "@clerk/nextjs";
const PostThread = ({ userId }: { userId: string }) => {
  const path = usePathname();
  const router = useRouter();
  const { organization } = useOrganization();
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    if (!organization) {
      await createThread({
        author: userId,
        text: values.thread,
        communityId: null,
        path,
      }).then(() => {
        alert("thread created successfully!");
      });
    } else {
      await createThread({
        author: userId,
        text: values.thread,
        communityId: organization.id,
        path,
      }).then(() => {
        alert(organization.name + " : thread created successfully!");
      });
    }

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
              {!!organization && (
                <FormDescription className="text-small-regular text-light-2 capitalize">
                  write a thread for <span className="text-body-bold text-primary-500" >{organization?.name}</span>{" "}
                  community!
                </FormDescription>
              )}
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
