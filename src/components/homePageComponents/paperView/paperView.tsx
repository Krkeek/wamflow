'use client'
import styles from './paperView.module.css'
import {useContext, useEffect, useRef} from "react";
import {viewJoint} from "@/libs/joint/viewJoint";
import {GraphContext} from "@/libs/joint/GraphContext";
import {ElementProps} from "../../../../declarations";
import {createLinkElement} from "@/libs/joint/createLinkElement";

type propsType = {
    elementSelected: string | null,
    setElementSelected: (el: any) => void
}

const PaperView = (props: propsType) =>{

    const paperRef = useRef<HTMLDivElement>(null);
    const graph = useContext(GraphContext);


    useEffect(()=>{
        if (paperRef.current){
            const paper = viewJoint(paperRef.current, graph);
            paper.on('element:pointerclick',(cellView)=>{
                props.setElementSelected(cellView.model.id)

            })

            paper.on('blank:pointerclick',()=>{
                props.setElementSelected(null)

            })
        }
    })

    return(
        <>
            <div ref={paperRef} className={`${styles.Container}`}></div>
        </>
    );
}
export default PaperView