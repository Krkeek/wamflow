import styles from './topBar.module.css'
import Image from "next/image";
import RegisterDialog from "@/components/registerDialog/registerDialog";
import {useState} from "react";

const TopBar = () =>{
    const [isOpen, setIsOpen] = useState(false)

    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.BrandDiv}`}>
                    <Image className={`logoAnimation ${styles.Logo}`} src={'/assets/logo.webp'} alt={'logo'} width={40} height={40} />
                    <p className={`brandNameAnimation ${styles.BrandName}`}>Wam<span className={`${styles.BrandNameSpan}`}>flow</span></p>
                </div>
                <button onClick={() => setIsOpen(true)}  className={`${styles.Button}`}>Editor</button>
                <RegisterDialog isOpen={isOpen} setIsOpen={setIsOpen} />

            </div>
        </>
    );
}
export default TopBar