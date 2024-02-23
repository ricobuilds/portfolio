"use client"

import { cn } from "@/lib/shared-utils"
import { useState } from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs"

const BlockWrapper = require("@sanity/block-content-to-react")

const Generic = ({node}: any) => {
  const [copy, setCopy] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(node.code)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1500);
  }
  return (
    <div className='w-full my-2 border border-obsidian-300'>
      <div className="flex items-center justify-end w-full p-2 bg-slate-500">
        <button
          onClick={() => handleCopy()}
          className={cn(
          "border border-obsidian-300",
          "bg-transparent",
          "w-6 h-6 p-0",
        )}>
          {!copy ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>}
        </button>
      </div>
      {/* @ts-ignore */}
      <SyntaxHighlighter language={node.language} style={github} customStyle={{ borderRadius: 0, margin: 0, width: "100%"}}>
        {node.code}
      </SyntaxHighlighter>
    </div>
  )
}
const serialisers = {
  types: {
    code: ({ node }: any) => (
      <Generic node={node} />
    )
  }
}

export { BlockWrapper, serialisers }