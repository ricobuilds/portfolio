import { Schema } from "@/lib/sdk";

export const authorSchema: Schema = {
  name: "author",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true
    },
  ],
};