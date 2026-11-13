import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Products from "@/components/Products";
import Results from "@/components/Results";
import { StudiekeuzetestEmbed } from "@/components/StudiekeuzetestButton";
import WaveDivider from "@/components/WaveDivider";
import WhatWeDo from "@/components/WhatWeDo";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <WhatWeDo />
      <WaveDivider />
      <HowItWorks />
      <Results />
      <StudiekeuzetestEmbed />
    </>
  );
}
