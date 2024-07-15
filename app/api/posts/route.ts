import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from "next/server"
import { loadMDXFile } from '@/lib/mdx';

const MDX_DIR = path.join(process.cwd(), 'content');

export async function GET(req: NextRequest) {

  const id = req.nextUrl.searchParams.get("id")
  console.log(id)

  if (id === null) return

  if (id.length > 0) {
    const post = await loadMDXFile(id)
    return new Response(JSON.stringify(post))
  } else {
    const files = fs.readdirSync(MDX_DIR)
    const posts = files
      .filter((file) => file.endsWith(".mdx"))
      .map((filename) => {
        const filePath = path.join(MDX_DIR, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        // Extract metadata if needed
        return { filename, content: fileContents }
      })
    return new Response(JSON.stringify(posts))
  }




}

export async function POST(req: NextRequest, res: NextResponse) {
  return new Response(JSON.stringify({ msg: "Post saved successfully!!" }))
}