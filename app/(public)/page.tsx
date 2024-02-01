import { SocialMedia } from "../sections/social-media";
import { Hero } from "../sections/hero";
import { Journal } from "../sections/journal";
import { Newsletter } from "../sections/newsletter";
import { StructuredData } from "../components/structured-data";
import { homeSchema } from "@/lib/web-schemas/home";

export default function Home() {
  return (
    <>
      <StructuredData data={homeSchema} />
      <main className="w-full px-4">
        <div className="flex flex-col max-w-[696px] min-h-screen gap-16 py-24 mx-auto">
          <Hero />
          <SocialMedia />
          <Journal />
          <Newsletter />
        </div>
      </main>
    </>
  );
}
