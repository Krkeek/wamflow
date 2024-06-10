'use client'
import styles from './paperView.module.css'
import {RefObject} from "react";

type propsType = {
    pageRef: RefObject<HTMLDivElement>
}

const PaperView = (props: propsType) =>{

    return(
        <>
                <div ref={props.pageRef} className={`${styles.Container}`}></div>
        </>
    );
}
export default PaperView