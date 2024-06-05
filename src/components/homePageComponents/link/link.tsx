import styles from './link.module.css'
import {LinkInterface} from "../../../../declarations";
import Image from "next/image";

type propsType = {
    link: LinkInterface,
    linkSelected: string,
    setLinkSelected: (link: string) => void

}

const Link = (props: propsType) =>{
    const link = props.link;

    const handleSelectLink = () =>{
        props.setLinkSelected(link.id);
    }


    return(
        <>
            <div className={`${styles.Container} `}>
                <Image onClick={handleSelectLink}  className={`${styles.SVG} ${ props.linkSelected === link.id && styles.SelectedArrow}`}
                       src={link.SVGUrl} alt={'shape'} width={70} height={70}/>
                <p className={`${styles.Id}`}>{link.name}</p>
                <div className={`${styles.Line} `}></div>
            </div>
        </>
    );
}

export default Link