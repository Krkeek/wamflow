
import styles from './diagramHeader.module.css'
import Image from "next/image";
const DiagramHeader = () =>{
    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.LeftDiv}`}>
                    <Image className={`${styles.Logo}`} src={'/assets/logo.webp'} alt={'logo'} width={35} height={35} />
                    <p className={`${styles.Title}`}>Untitled1</p>
                </div>
                <button className={`${styles.Import}`}><Image className={`${styles.Logo}`} src={'/assets/import.webp'} alt={'logo'} width={20} height={20} /></button>

            </div>

        </>
    );
}

export default DiagramHeader