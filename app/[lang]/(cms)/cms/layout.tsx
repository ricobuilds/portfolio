import { ReactNode } from "react";
import { Sidebar } from "./components/sidebar";
import { BucketDialog } from "./components/popups/bucket-dialog";

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    
    <div className="grid overflow-hidden h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      {children}
      <BucketDialog />
    </div>
  )
}