"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useNotFoundModal } from "@/hooks/use-not-found-modal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(1),
});

export const NotFoundModal = () => {
  const notFoundModal = useNotFoundModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      toast.success("Submitted");

      // window.location.assign(`/${response.data.id}/overview`)
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onReturnToDashboard = () => {
    window.location.assign(`/dashboard`);
  };

  return (
    <Modal
      title="Page Not Found"
      description="This page does not currently exist, but if you think it should, or if you have found an error within the application, then please let us know!"
      isOpen={notFoundModal.isOpen}
      onClose={onReturnToDashboard}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area</FormLabel>
                      <FormControl>
                        <div className="grid gap-2">
                          <Select defaultValue="billing">
                            <SelectTrigger id="area">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="team">Team</SelectItem>
                              <SelectItem value="billing">Billing</SelectItem>
                              <SelectItem value="account">Account</SelectItem>
                              <SelectItem value="deployments">
                                Deployments
                              </SelectItem>
                              <SelectItem value="support">Support</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Severity</FormLabel>
                      <FormControl>
                        <div className="grid gap-2">
                          <Select defaultValue="2">
                            <SelectTrigger id="area">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">
                                Severity 1 (Highest)
                              </SelectItem>
                              <SelectItem value="2">Severity 2</SelectItem>
                              <SelectItem value="3">Severity 3</SelectItem>
                              <SelectItem value="4">
                                Severity 4 (Lowest)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        id="subject"
                        placeholder="I need help with..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="Please include all information relevant to your issue."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="justify-between space-x-2">
                <Button variant="ghost" type="button" onClick={onReturnToDashboard}>Dashboard</Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
