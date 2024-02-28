import { Hero } from "../sections/hero";
import { Journal } from "../sections/journal";
// import { Newsletter } from "../sections/newsletter";
import { StructuredData } from "../components/structured-data";
import { homeSchema } from "@/lib/web-schemas/home";
import { Ventures } from "../sections/ventures";
import { Products } from "../sections/products"
import { Stack } from "../sections/stack";
import { Outro } from "../sections/outro";
import { cn } from "@/lib/shared-utils";
import { baseWidth } from "@/lib/config";
import dynamic from "next/dynamic";


const DynamicNewsletter = dynamic(() => import("../sections/newsletter"), {
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  return (
    <>
      <StructuredData data={homeSchema} />
      <main className="w-full px-6">
        <div className={cn(baseWidth, "min-h-screen mx-auto")}>
          <div className="flex flex-col gap-12 py-24 pb-10 ">
            <Hero />
            <Journal />
            <Ventures />
            <Products />
            <Stack />
            <DynamicNewsletter />
            <Outro />
          </div>
        </div>
      </main>
    </>
  );
}
