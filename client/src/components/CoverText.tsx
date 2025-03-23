import { Cover } from "./ui/Cover";

export function CoverText() {
  return (
    <div className="py-12 px-4">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mx-auto text-center mt-8 relative z-20 py-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Seamless video calls <br /> with <Cover>blazing speed</Cover>
      </h1>
    </div>
  );
}