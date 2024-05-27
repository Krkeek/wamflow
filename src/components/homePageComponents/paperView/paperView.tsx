'use client'
import styles from './paperView.module.css'
import {useContext, useEffect, useRef} from "react";
import {viewJoint} from "@/libs/joint/viewJoint";
import {GraphContext} from "@/libs/joint/GraphContext";
import {ElementProps} from "../../../../declarations";
import {createLinkElement} from "@/libs/joint/createLinkElement";

type propsType = {
    elementSelected: ElementProps,
    setElementSelected: (el: ElementProps) => void
}

const PaperView = (props: propsType) =>{

    const paperRef = useRef<HTMLDivElement>(null);
    const graph = useContext(GraphContext);


    useEffect(()=>{
        if (paperRef.current){
            const paper = viewJoint(paperRef.current, graph);
            paper.on('element:pointerclick',(cellView)=>{
                console.log(cellView);
                props.setElementSelected({
                    name: " "+ cellView.model.attributes.attrs?.name,
                    uri: " " + cellView.model.attributes.attrs?.uri,
                    width: 25,
                    height: 25
                })

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