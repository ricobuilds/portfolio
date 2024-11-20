import blogSchema from "./blog";
import { Schema } from "@/lib/sdk";

export const schemaOrigin: { [key in string]: Schema } = {
  "blog": blogSchema
}