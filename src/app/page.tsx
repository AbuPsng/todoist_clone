import PricingSection from "@/components/landing_page/sections/PricingSection";
import FeatureSection from "@/components/landing_page/sections/FeatureSection";
import HeroSection from "@/components/landing_page/sections/HeroSection";
import Navbar from "@/components/landing_page/Navbar";
import Footer from "@/components/landing_page/Footer";

export default function LandingPage() {
	return (
		<div className="overflow-x bg-gray-50">
			{" "}
			<Navbar />
			<HeroSection />
			<FeatureSection />
			<PricingSection />
			<Footer />
		</div>
	);
}
