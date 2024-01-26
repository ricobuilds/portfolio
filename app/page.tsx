import Image from "next/image";
import { SocialMedia } from "./sections/social-media";
import { Hero } from "./sections/hero";

export default function Home() {
  return (
    <main className="px-4 w-full">
      <div className="max-w-screen-md mx-auto py-24 min-h-screen flex flex-col gap-16">
        <Hero/>
        <SocialMedia />
      </div>
    </main>
  );
}
