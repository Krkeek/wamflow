'use client'
import styles from './paperView.module.css'
import {useContext, useEffect, useRef} from "react";
import {viewJoint} from "@/libs/joint/viewJoint";
import {GraphContext} from "@/libs/joint/GraphContext";

const PaperView = () =>{

    const paperRef = useRef<HTMLDivElement>(null);
    const graph = useContext(GraphContext);


    useEffect(()=>{
        if (paperRef.current)
            viewJoint(paperRef.current, graph)
    })

    return(
        <>
            <div ref={paperRef} className={`${styles.Container}`}></div>
        </>
    );
}
export default PaperView