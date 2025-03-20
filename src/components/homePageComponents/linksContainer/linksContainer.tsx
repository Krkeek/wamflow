import styles from './linksContainer.module.css'
import {LinksData} from "../../../../dataEntry";
import Link from "@/components/homePageComponents/link/link";
import {dia} from "@joint/core";

interface Props {
}

const LinksContainer = (props: Props) =>{
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