import styles from './link.module.css'
import {LinkInterface} from "../../../../declarations";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setLinkName} from "@/libs/redux/features/linkNameSlice";
import {setToggleContainer} from "@/libs/redux/features/mobileToggleContainerSlice";
import {useContext, useEffect, useState} from "react";
import {PaperContext} from "@/libs/joint/PaperContext";

type propsType = {
    link: LinkInterface,
}

const Link = (props: propsType) =>{
    const link = props.link;
    const dispatch = useAppDispatch()
    const linkNameSelected = useAppSelector(state => state.linkName.value)
    const [prevScale, setPrevScale] = useState<{sx: number, sy: number }>({sx: 1, sy: 1});
    const paper = useContext(PaperContext);

    const handleSelectLink = () => {
        if (!paper)
            return;

        const x = paper.scale().sx;
        const y = paper.scale().sy;
        setPrevScale({sx: x, sy: y});

        // Dispatch actions to set link name and toggle container
        dispatch(setToggleContainer(false));
        dispatch(setLinkName(link.id));

    };


    useEffect(() => {
        if (prevScale)
            paper?.scale(prevScale.sx, prevScale.sy);
    }, [linkNameSelected]);

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