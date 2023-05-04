import React from "react";

import { InfoSection } from "@/components/landing/InfoSection";
import { StartScreenSection } from "@/components/landing/StartScreenSection";
import { FreemasonrySection } from "@/components/landing/FreemasonrySection";
import { FranceSection } from "@/components/landing/FranceSection";
import { FAQSection } from "@/components/landing/FAQSection";

export const Landing: React.FC = () => {
   return (
      <>
         <StartScreenSection />
         <InfoSection />
         <FreemasonrySection />
         <FranceSection />
         <FAQSection />
      </>
   );
};
