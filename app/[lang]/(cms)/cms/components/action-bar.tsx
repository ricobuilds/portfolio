import { Processor } from "./popups/processor";
import { ActionItems } from "./action-items";

export function ActionBar() {
  return (
    <header className="flex h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6">
      <ActionItems />
      <Processor />
    </header>
  )
}