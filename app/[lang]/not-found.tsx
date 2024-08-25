import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/shared-utils";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Page not found"
}

export default function NotFound() {

  return (
    <main className={cn(GeistSans.className, "flex flex-col h-screen text-center")}>
      <div className="flex flex-col items-center justify-center w-full h-full m-auto">
        <Image src="https://illustrations.popsy.co/purple/crashed-error.svg" width={200} height={200} alt="404 rocket crash - Popsy" />
        <h2 className="font-semibold text-7xl">Oops!</h2>
        <p className="text-3xl font-semibold">{"Sorry, we couldn't find this page."}</p>
        <p>{"But don't worry, you can find plenty of other things on my homepage."}</p>
        <p className="mt-6"><Link href={routes.home} className="px-8 py-3 font-semibold border border-obsidian-200">Back to homepage</Link></p>
      </div>
    </main>
  )
}