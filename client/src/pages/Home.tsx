import CorePillarsSection from "@/components/home/CorePillarsSection"
import HeroSection from "@/components/home/HeroSection"
import PartnerStrip from "@/components/home/PartnerStrip"

export default function Home() {
  return (
    <div className="w-full min-w-0 overflow-x-clip">
      <HeroSection />
      <PartnerStrip />
      <CorePillarsSection />
    </div>
  )
}
