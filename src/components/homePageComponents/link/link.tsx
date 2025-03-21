import styles from './link.module.css'
import {LinkInterface} from "../../../../declarations";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setLinkName} from "@/libs/redux/features/linkNameSlice";
import {useContext} from "react";
import {PaperContext} from "@/libs/joint/PaperContext";
import {TrustRelationship} from "@/libs/joint/links/TrustRelationship/TrustRelationship";
import {Invocation} from "@/libs/joint/links/Invocation/Invocation";
import {LegacyRelationship} from "@/libs/joint/links/LegacyRelationship/LegacyRelationship";

type propsType = {
    link: LinkInterface,
}

const Link = (props: propsType) =>{
    const dispatch = useAppDispatch()
    const link = props.link;
    const linkNameSelected = useAppSelector(state => state.linkName.value)
    const paper = useContext(PaperContext);

    const handleSelectLink = () => {
        if (!paper)
            return;

        dispatch(setLinkName(link.id));

        if (link.id === "invocation")
            paper.options.defaultLink = new Invocation();
        else if (link.id === "trustRelationship")
            paper.options.defaultLink = new TrustRelationship();
        else
            paper.options.defaultLink = new LegacyRelationship();
    };
    return(
        <>
            <div className={`${styles.Container} `}>
                <Image onClick={handleSelectLink}  className={`${styles.SVG} ${ linkNameSelected === link.id && styles.SelectedArrow}`}
                       src={link.SVGUrl} alt={'shape'} width={70} height={70}/>
                <p className={`${styles.Id}`}>{link.name}</p>
                <div className={`${styles.Line} `}></div>
            </div>
        </>
    );
}

export default Link