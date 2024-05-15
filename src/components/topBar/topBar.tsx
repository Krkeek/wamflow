import styles from './topBar.module.css'
import Image from "next/image";

const TopBar = () =>{


    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.BrandDiv}`}>
                    <Image className={`logoAnimation ${styles.Logo}`} src={'/assets/logo.webp'} alt={'logo'} width={40} height={40} />
                    <p className={`brandNameAnimation ${styles.BrandName}`}>Wam<span className={`${styles.BrandNameSpan}`}>flow</span></p>
                </div>
                <button className={`${styles.Button}`}>Get Started</button>

            </div>
        </>
    );
}
export default TopBar