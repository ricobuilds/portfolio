import { routes } from "@/lib/routes";
import { cn } from "@/lib/shared-utils";
import { GeistSans } from "geist/font/sans";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className={cn(GeistSans.className, "flex flex-col h-full flex-1 text-center")}>
      <div className="flex flex-col items-center m-auto">
        <Image src="https://illustrations.popsy.co/purple/crashed-error.svg" width={200} height={200} alt="404 rocket crash - Popsy" />
        <h2 className="font-semibold text-7xl">Oops!</h2>
        <p>{"The page you're looking for doesn't exist, or has been removed."}</p>
        <p className="mt-6"><Link href={routes.blog} className="px-8 py-3 font-semibold border border-obsidian-200">Back to Blog homepage</Link></p>
      </div>
    </main>
  )
}