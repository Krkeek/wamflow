
import styles from './features.module.css'
import Image from "next/image";
const Features = () =>{
    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.Feature}`}>
                    <Image className={`${styles.Image}`} src={'/assets/features/feature1.webp'} alt={'feature'} width={60} height={60}/>
                    <p>Drag, Drop, Design!</p>
                </div>
                <div className={`${styles.Feature}`}>
                    <Image className={`${styles.Image}`} src={'/assets/features/feature2.webp'} alt={'feature'} width={60} height={60}/>
                    <p>Export and Import  JSON or RDF</p>
                </div>
                <div className={`${styles.Feature}`}>
                    <Image className={`${styles.Image}`} src={'/assets/features/feature3.webp'} alt={'feature'} width={60} height={60}/>
                    <p>Markdown-Powered Diagram Creation</p>
                </div>
            </div>

        </>
    );
}

export default Features