import { BrightCode } from "./bright"
import { CopyButton } from "./copy-btn"

const BlockWrapper = require("@sanity/block-content-to-react")

const Generic = ({ node }: any) => {
  return (
    <div className='w-full my-2 border border-obsidian-300'>
      <div className="flex items-center justify-end w-full p-2 bg-slate-500">
        <CopyButton />
      </div>
      <BrightCode lang={node.language} code={node.code} />
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