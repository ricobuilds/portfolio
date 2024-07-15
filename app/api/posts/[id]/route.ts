import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from "next/server"
import { loadMDXFile } from '@/lib/mdx';

// const MDX_DIR = path.join(process.cwd(), 'content');

export async function GET(req: NextRequest) {

  // const post = await loadMDXFile()

  console.log(req.nextUrl.searchParams.get("id"))

  return new Response(JSON.stringify({post: "post"}))
}

// export async function POST(req: NextRequest, res: NextResponse) {
//   const { filename, content } = req.body;
//   const filePath = path.join(process.cwd(), "posts", filename + ".mdx")
//   fs.writeFileSync(filePath, content)
//   return new Response(JSON.stringify({ msg: "Post saved successfully!!" }))
// }