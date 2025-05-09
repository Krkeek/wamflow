'use client'
import styles from "./page.module.css";
import HeroSection from "@/components/heroSection/heroSection";
import FeatureSection from "@/components/featureSection/featureSection";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {LandingPageAnimation} from "@/libs/gsap/LandingPageAnimation";
import GraphProvider from "@/libs/joint/GraphProvider";
gsap.registerPlugin(useGSAP);
import { SpeedInsights } from "@vercel/speed-insights/next"
import {ConfirmDialogProvider} from "@/utils/contexts/ConfirmDialogContext";
import MuiThemeProvider from "@/utils/contexts/MuiThemeProvider";
export default function Home() {
    useGSAP(()=>{
        const ctx = gsap.context(()=> LandingPageAnimation() )
        return ()=> ctx.revert()
    })

    return (
    <>
        <MuiThemeProvider>
        <ConfirmDialogProvider>
        <GraphProvider>
            <div className={`${styles.GridContainer}`}>
                    <div className={`${styles.BgImage} bgAnimation`}
                         style={{backgroundImage: 'url(\'/assets/diagram.png\')'}}>
                        <HeroSection/>
                        <FeatureSection/>
                    </div>
                </div>
        </GraphProvider>
        </ConfirmDialogProvider>
        </MuiThemeProvider>
        <SpeedInsights />
    </>
    );
}
