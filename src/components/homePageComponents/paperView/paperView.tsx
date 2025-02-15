'use client'
import styles from './paperView.module.css'
import React, {RefObject, useContext} from "react";
import {createJointElement} from "@/libs/joint/createJointElement";
import {GraphContext} from "@/libs/joint/GraphContext";
import {dia} from "@joint/core";
import Paper = dia.Paper;

type propsType = {
    pageRef: RefObject<HTMLDivElement | null>,
    paper: Paper | null

}

const PaperView = (props: propsType) =>{
    const graph = useContext(GraphContext);


    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        console.log(graph);
        const elementId = e.dataTransfer.getData("elementId");
        const mousePosition = props.paper?.clientToLocalPoint(e.clientX, e.clientY);

        // @ts-ignore
        createJointElement(elementId, graph, mousePosition.x, mousePosition.y);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };


    return(
        <>
                <div ref={props.pageRef} className={`${styles.Container}`}
                     onDrop={handleDrop}
                     onDragOver={handleDragOver}
                ></div>
        </>
    );
}
export default PaperView