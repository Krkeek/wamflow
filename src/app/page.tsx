import styles from "./page.module.css";
import HeroSection from "@/components/heroSection/heroSection";
import FeatureSection from "@/components/featureSection/featureSection";

export default function Home() {
  return (
    <>
        <div className={`${styles.GridContainer}`}>
            <div className={`${styles.BgImage}`} style={{backgroundImage: 'url(\'/assets/diagram.png\')'}}>
            <HeroSection />
            <FeatureSection />
            </div>
        </div>
    </>
  );
}
