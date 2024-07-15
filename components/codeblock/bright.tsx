import { Code } from "bright"
import { focus } from "./extensions/focus"

export const BrightCode = ({ lang, code, lineNumbers }: { lang: string, code: string, lineNumbers?: boolean }) => {
  return (
    <div className="overflow-auto text-sm">
      <Code lang={lang} theme={"github-dark"} lineNumbers={lineNumbers} extensions={[focus]} style={{margin: 0,}}>
        {code.trim()}
      </Code>
    </div>
  )
}