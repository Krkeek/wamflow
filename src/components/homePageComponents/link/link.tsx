import styles from './link.module.css'
import {LinkInterface} from "../../../../declarations";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setLinkSelected} from "@/libs/redux/features/linkSelectedSlice";
import {setToggleContainer} from "@/libs/redux/features/mobileToggleContainerSlice";

type propsType = {
    link: LinkInterface,

}

const Link = (props: propsType) =>{
    const link = props.link;
    const dispatch = useAppDispatch()
    const linkSelected = useAppSelector(state => state.linkSelected.value)

    const handleSelectLink = () =>{
        dispatch(setToggleContainer(false))
        dispatch(setLinkSelected(link.id))
    }

    return(
        <>
            <div className={`${styles.Container} `}>
                <Image onClick={handleSelectLink}  className={`${styles.SVG} ${ linkSelected === link.id && styles.SelectedArrow}`}
                       src={link.SVGUrl} alt={'shape'} width={70} height={70}/>
                <p className={`${styles.Id}`}>{link.name}</p>
                <div className={`${styles.Line} `}></div>
            </div>
        </>
    );
}

export default Link