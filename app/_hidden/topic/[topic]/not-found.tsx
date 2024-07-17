import { routes } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col flex-1 h-full text-center">
      <div className="relative flex flex-col items-center m-auto">
        <Image src="https://illustrations.popsy.co/purple/crashed-error.svg" width={200} height={200} alt="404 rocket crash - Popsy" />
        <h2 className="font-semibold text-7xl">Oops!</h2>
        <p>{"The page you're looking for doesn't exist, or has been removed."}</p>
        <p className="mt-6"><Link href={routes.blog} className="px-8 py-3 font-semibold border border-obsidian-200">Back to Blog homepage</Link></p>
      </div>
    </main>
  )
}