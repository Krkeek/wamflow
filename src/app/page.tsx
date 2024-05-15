'use client'
import styles from "./page.module.css";
import HeroSection from "@/components/heroSection/heroSection";
import FeatureSection from "@/components/featureSection/featureSection";
import { ReactLenis} from '@studio-freight/react-lenis'
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {LandingPageAnimation} from "@/animation/LandingPage";
gsap.registerPlugin(useGSAP);

export default function Home() {


    useGSAP(()=>{
        const ctx = gsap.context(()=> LandingPageAnimation() )
        return ()=> ctx.revert()
    })



    return (
    <>
        <ReactLenis root>
            <div className={`${styles.GridContainer}`}>
                <div className={`${styles.BgImage} bgAnimation`} style={{backgroundImage: 'url(\'/assets/diagram.png\')'}}>
                    <HeroSection/>
                    <FeatureSection/>
                </div>
            </div>
        </ReactLenis>
    </>
  );
}
