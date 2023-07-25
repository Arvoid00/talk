"use client";

import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../core/Button";
import { updateUser } from "../../actions/updateUser";
import { stringToColor, invertColorForText } from "../../utils";

const getDefaults = <Schema extends z.AnyZodObject>(
  schema: Schema
): {
  [k: string]: unknown;
} =>
  Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault) {
        return [key, value._def.defaultValue()];
      }
      // eslint-disable-next-line no-undefined
      return [key, undefined];
    })
  );

export interface ProfileFormProps {
  user: any;
  prompts: any[];
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, prompts }) => {
  const formSchema = z.object(
    prompts.reduce<z.ZodRawShape>(
      (schema, prompt, i) =>
        Object.assign(schema, {
          [`prompt_id_${i}`]: z
            .number()
            .nullable()
            .optional()
            .default(prompt.id),
          [`prompt_name_${i}`]: z
            .string()
            .optional()
            .default(prompt.prompt_name),
          [`prompt_body_${i}`]: z
            .string()
            .optional()
            .default(prompt.prompt_body)
        }),
      {
        username: z
          .string()
          .min(2, { message: `Username cannot have fewer than 2 characters` })
          .max(50, { message: `Username cannot have more than 50 characters` })
          .default(user.user_metadata.user_name),
        email: z
          .string()
          .email({ message: `Please enter a valid email address` })
          .default(user.user_metadata.email)
      }
    )
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: `onChange`,
    defaultValues: getDefaults(formSchema)
  });
  const { isDirty, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof finalFormSchema>) {
    try {
      const result = await updateUser({ values, user });
      console.log(`Update User Result:`, result);
    } catch (error) {
      console.error(`Error Updating User:`, error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        method="post"
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="smol-developer" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="sama@openai.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {prompts.map((prompt, index) => (
          <React.Fragment key={index}>
            <FormField
              control={form.control}
              name={`prompt_name_${index}`}
              render={({ field }) => (
                <div className="flex">
                  <FormItem className="mb-4 flex-1">
                    <FormLabel>Prompt Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Tech Guru" {...field} />
                    </FormControl>
                    <FormDescription>
                      Create a brief, descriptive title for your profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                  <FormItem className="ml-4">
                    <FormLabel>Prompt Color</FormLabel>
                    <FormDescription
                      style={{
                        backgroundColor: stringToColor(field.value),
                        color: invertColorForText(stringToColor(field.value)),
                        textAlign: `center`,
                        margin: `1rem`
                      }}
                    >
                      {stringToColor(field.value)}
                    </FormDescription>
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name={`prompt_body_${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt Body</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="I'm a tech enthusiast who loves discussing the latest gadgets and AI trends."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Identify your unique perspective or a perspective you&apos;d
                    like the AI to adopt. This helps the AI to tailor its
                    responses to your interests.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </React.Fragment>
        ))}
        <Button type="submit" disabled={!isDirty || !isValid}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
