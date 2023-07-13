"use server";
// random id up to 11 chars
export const nanoid = (): string => Math.random().toString(36).slice(2);
