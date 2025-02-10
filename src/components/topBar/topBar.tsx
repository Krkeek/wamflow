import styles from './topBar.module.css'
import Image from "next/image";
import Link from "next/link";

const TopBar = () =>{

    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.BrandDiv}`}>
                    <Image className={`logoAnimation ${styles.Logo}`} src={'/assets/logo.webp'} alt={'logo'} width={40} height={40} />
                    <p className={`brandNameAnimation ${styles.BrandName}`}>Wam<span className={`${styles.BrandNameSpan}`}>flow</span></p>
                </div>
                <Link href={'/homePage'} className={`${styles.Button}`}>Editor</Link>
            </div>
        </>
    );
}
export default TopBar