'use client'
import styles from './paperView.module.css'
import {useEffect, useRef} from "react";
import {joint} from "@/libs/joint/joint";

const PaperView = () =>{

    const paperRef = useRef(null);

    useEffect(()=>{
        joint(paperRef.current)
    })

    return(
        <>
            <div ref={paperRef} className={`${styles.Container}`}>

            </div>
        </>
    );
}
export default PaperView