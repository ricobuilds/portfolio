import { SocialMedia } from "./sections/social-media";
import { Hero } from "./sections/hero";
import { Journal } from "./sections/journal";

export default function Home() {
  return (
    <main className="w-full px-4">
    <div className="flex flex-col max-w-screen-md min-h-screen gap-16 py-24 mx-auto">
        <Hero />
        <SocialMedia />
        <Journal />
      </div>
    </main>
  );
}
