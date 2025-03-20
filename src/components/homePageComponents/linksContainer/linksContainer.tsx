import styles from './linksContainer.module.css'
import {LinksData} from "../../../../dataEntry";
import Link from "@/components/homePageComponents/link/link";

const LinksContainer = () =>{
    return(
        <>
            <div className={`${styles.Container}`}>
                {
                    LinksData.map((link, index)=>(
                        <Link key={index} link={link} />
                    ))

                }
            </div>
        </>
    );
}

export default LinksContainer