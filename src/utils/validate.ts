import type { AnyZodObject, z } from "zod";

export const zValidateReq = async <T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> => {
  const json = await req.json();
  const input = schema.safeParse(json);
  if (!input.success) {
    // eslint-disable-next-line no-console
    console.error(`❌ Invalid inputs:`);
    input.error.issues.forEach((issue) => {
      // eslint-disable-next-line no-console
      console.error(issue);
    });
    throw new Error(`Invalid environment variables`);
  }
  return input.data;
};
