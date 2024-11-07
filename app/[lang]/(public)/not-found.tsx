import { routes } from "@/lib/routes";
import { cn } from "@/lib/shared-utils";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found"
}

export default function NotFound() {
  // public
  return (
    <main className={cn(GeistSans.className, "flex flex-col h-[70vh]  text-center")}>
      <div className="flex flex-col items-center gap-3 pb-10 m-auto">
        <Image src="https://illustrations.popsy.co/purple/crashed-error.svg" width={200} height={200} alt="404 rocket crash - Popsy" />
        <h2 className="font-semibold text-7xl">Oops!</h2>
        <p>{"The page you're looking for doesn't exist, or has been removed."}</p>
        <Link href={routes.home} className="px-8 py-3 font-semibold border hover:bg-slate-100 border-obsidian-200">Back to homepage</Link>
      </div>
    </main>
  )
}