import { SocialMedia } from "../sections/social-media";
import { Hero } from "../sections/hero";
import { Journal } from "../sections/journal";
import { Newsletter } from "../sections/newsletter";
import { StructuredData } from "../components/structured-data";
import { homeSchema } from "@/lib/web-schemas/home";
import { Ventures } from "../sections/ventures";
import { Products } from "../sections/products"
import { Stack } from "../sections/stack";
import { Outro } from "../sections/outro";

export default function Home() {
  return (
    <>
      <StructuredData data={homeSchema} />
      <main className="w-full px-4">
        <div className="flex flex-col max-w-[696px] min-h-screen gap-12 py-24 pb-10 mx-auto">
          <Hero />
          <SocialMedia />
          <Ventures />
          <Products  />
          <Stack />
          <Newsletter />
          <Outro/>
        </div>
      </main>
    </>
  );
}
