import styles from './featureSection.module.css'
import Footer from "@/components/footer/footer";
const FeatureSection = () =>{
    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.FeatureDiv}`}>

                </div>
                <div className={`${styles.FooterDiv}`}>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default FeatureSection