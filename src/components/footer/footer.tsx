import styles from './footer.module.css'
import Link from "next/link";
const Footer = ()=>{
    return(
        <>
            <div className={`${styles.Container}`}>
                <p className={`${styles.CopyRight}`}>©2024 Wamflow. All Rights Reserved </p>
                <div>
                    <Link className={`${styles.FooterLink}`} href={'#'}>Privacy Policy</Link>
                    <Link className={`${styles.FooterLink}`} href={'#'}>Imprint</Link>
                    <Link className={`${styles.FooterLink}`} href={'#'}>Term of use</Link>
                </div>

            </div>

        </>
    );
}

export default Footer