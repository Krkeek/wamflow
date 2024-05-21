'use client'
import styles from './paperView.module.css'
import {useEffect, useRef} from "react";
import {startJoint} from "@/libs/joint/joint";

const PaperView = () =>{

    const paperRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if (paperRef.current)
            startJoint(paperRef.current)
    })

    return(
        <>
            <div ref={paperRef} className={`${styles.Container}`}>

            </div>
        </>
    );
}
export default PaperView