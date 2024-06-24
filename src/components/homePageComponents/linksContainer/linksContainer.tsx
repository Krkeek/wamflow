import styles from './linksContainer.module.css'
import {LinksData} from "../../../../dataEntry";
import Link from "@/components/homePageComponents/link/link";

type propsType = {

}

const LinksContainer = (props: propsType) =>{
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