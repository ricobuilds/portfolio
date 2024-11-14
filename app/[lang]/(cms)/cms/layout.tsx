import { ReactNode } from "react";
import { Sidebar } from "./components/sidebar";
import { BucketDialog } from "./components/popups/bucket-dialog";
import { SDK } from "@/lib/sdk";
import { RiFolder5Fill } from "@remixicon/react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const workspace = SDK.workspace.getWorkspace()

  if (workspace !== true) {
    return <EmptyWorkspaceScreen />
  }

  return (
    <div className="grid overflow-hidden h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      {children}
      <BucketDialog />
    </div>
  )
}

const EmptyWorkspaceScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <RiFolder5Fill className="w-20 h-20 text-slate-600" />
      <h2 className="text-lg font-bold">Create your Modox workspace</h2>
      <p className="text-sm text-slate-500">You don't have a dedicated workspace – create one now.</p>
      <div className="mt-3">
        <button className="px-3 py-1.5 text-sm text-white rounded-lg bg-amethyst-500">Create workspace</button>
      </div>
    </div>
  )
}