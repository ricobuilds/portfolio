import { Schema } from "@/lib/sdk";

const blogSchema: Schema = {
  name: "blog",
  fields: [
    {
      name: "id",
      label: "ID",
      type: "text",
      required: true
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true
    },
    {
      name: "slug",
      label: "Slug",
      type: "slug",
      required: true
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: true
    },
    {
      name: "author",
      label: "Author",
      type: "relation",
      required: true
    },
    {
      name: "youtubeUrl",
      label: "YouTube ID",
      type: "url",
      required: true
    },
    {
      name: 'status',
      label: 'Status',
      type: 'status',
      validation: {
        options: ['Idea', 'Draft', 'Published']
      }
    },
    {
      name: 'created',
      label: 'Created',
      type: 'date'
    },
    {
      name: 'updated',
      label: 'Updated',
      type: 'date'
    },
  ],
};

export default blogSchema