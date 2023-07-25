import z from "zod";

export const getDefaults = <Schema extends z.AnyZodObject>(
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
