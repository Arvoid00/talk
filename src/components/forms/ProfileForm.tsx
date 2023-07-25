/* eslint-disable no-console */
"use client";

import React from "react";
import z from "zod";
import { Form, useFormStore } from "@ariakit/react";
import type { User } from "@supabase/supabase-js";
import { updateUser } from "../../actions/updateUser";
import { stringToColor, invertColorForText, getDefaults } from "../../utils";
import { TextField, FieldFrame, TextAreaField, Submit } from "../core/form";
import type { Prompt } from "../../types";

export interface ProfileFormProps {
  user: User;
  prompts: Prompt[];
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  user = {
    id: `1234`,
    app_metadata: {},
    user_metadata: {
      user_name: `Saeris`,
      email: `drake@saeris.io`
    },
    aud: `fasdfdf`
  },
  prompts
}) => {
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

  const form = useFormStore({
    defaultValues: getDefaults(formSchema)
  });
  const promptName = form.useValue(`prompt_name_0`);
  const isValid = form.getState().valid;

  form.useValidate((state) => {
    const result = formSchema.safeParse(state.values);
    if (!result.success) {
      const errors = result.error.flatten();
      for (const [field, error] of Object.entries(errors.fieldErrors)) {
        form.setError(field, error?.[0]);
      }
    }
  });

  form.useSubmit(async (values) => {
    try {
      const result = await updateUser({ values, user });
      console.log(`Update User Result:`, result);
    } catch (error: unknown) {
      console.error(`Error Updating User:`, error);
    }
  });

  return (
    <Form store={form} className="space-y-8">
      <TextField
        name="username"
        label="Username"
        placeholder="smol-developer"
        hint="This is your public display name."
      />
      <TextField name="email" label="Email" placeholder="sama@openai.com" />
      <div className="flex">
        <TextField
          name={`prompt_name_0`}
          label="Prompt Name"
          placeholder="Tech Guru"
          hint="Create a brief, descriptive title for your profile."
        />

        <FieldFrame className="ml-4">
          <span>Prompt Color</span>
          <span
            style={{
              backgroundColor: stringToColor(promptName),
              color: invertColorForText(stringToColor(promptName)),
              textAlign: `center`,
              margin: `1rem`
            }}
          >
            {stringToColor(promptName)}
          </span>
        </FieldFrame>
      </div>
      <TextAreaField
        name={`prompt_body_0`}
        label="Prompt Body"
        placeholder="I'm a tech enthusiast who loves discussing the latest gadgets and AI trends."
        hint="Identify your unique perspective or a perspective you'd
              like the AI to adopt. This helps the AI to tailor its
              responses to your interests."
      />
      <Submit disabled={!isValid}>Submit</Submit>
    </Form>
  );
};
