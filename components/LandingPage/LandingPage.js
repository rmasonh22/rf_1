import EmailCapture from "./EmailCapture";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import FeaturesCont from "./FeaturesCont";
import CTA from "./CTA";

function LandingPage() {
  return (
    <div className="bg-lightning-50">
      <Hero />
      <Features />
      <CTA showWhatsIncluded={false} />
      <FeaturesCont />
      <CTA />
      <EmailCapture />
      <Footer />
    </div>
  );
}

export default LandingPage;
