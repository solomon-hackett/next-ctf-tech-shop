import type { Metadata } from "next";
import { bitcount } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Tech Haven - your one stop destination for tech.",
};

export default function Page() {
  return (
    <main>
      <h1 className={`text-9xl text-center ${bitcount.className}`}>Welcome to Tech Haven</h1>
      
    </main>
  );
}
