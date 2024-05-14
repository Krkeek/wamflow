import styles from './featureSection.module.css'
import Footer from "@/components/footer/footer";
import Features from "@/components/featureSection/features/features";
const FeatureSection = () =>{
    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.FeatureDiv}`}>
                    <Features />
                </div>
                <div className={`${styles.FooterDiv}`}>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default FeatureSection