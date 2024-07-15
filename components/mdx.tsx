import { MDXRemote } from "next-mdx-remote/rsc"
export const CustomMDX = (props: any) => {

  return (
    <MDXRemote
      {...props}
    />
  )
}