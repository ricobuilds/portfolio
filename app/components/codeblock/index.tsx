import { BrightCode } from "./bright"
import { CopyButton } from "./copy-btn"

const BlockWrapper = require("@sanity/block-content-to-react")

const Generic = ({ node }: any) => {
  return (
    <div className='relative w-full'>
      <div className="absolute flex items-center justify-end w-full p-2">
        <CopyButton node={node} />
      </div>
      <BrightCode lang={node.language} code={node.code} />
    </div>
  )
}
const serialisers = {
  types: {
    code: ({ node }: any) => (
      <Generic node={node} />
    ),
  }
}

export { BlockWrapper, serialisers }