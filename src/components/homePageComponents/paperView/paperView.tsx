'use client'
import styles from './paperView.module.css'
import React, {RefObject, useContext} from "react";
import {createJointElement} from "@/libs/joint/createJointElement";
import {GraphContext} from "@/libs/joint/GraphContext";
import {dia} from "@joint/core";
import Paper = dia.Paper;
import {setElementSelected} from "@/libs/redux/features/elementSelectedSlice";
import {setToggleContainer} from "@/libs/redux/features/mobileToggleContainerSlice";

type propsType = {
    pageRef: RefObject<HTMLDivElement | null>,
    paper: Paper | null,
    elementSelected: any,
    dispatch: any,
    toggleContainer: boolean,
    isMobileView: boolean,
}

const PaperView = (props: propsType) =>{
    const graph = useContext(GraphContext);


    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const elementId = e.dataTransfer.getData("elementId");
        const mousePosition = props.paper?.clientToLocalPoint(e.clientX, e.clientY);

        // @ts-ignore
        const element = createJointElement(elementId, graph, mousePosition.x, mousePosition.y);

        //Auto select the dropped element
        if (props.elementSelected !== null){
            const prevElement = graph.getCell(props.elementSelected);
            if (prevElement){
                prevElement.attr('path/stroke','black');
                prevElement.attr('body/stroke','black');
                prevElement.attr('top/stroke','black');

            }
        }
        props.dispatch(setElementSelected(null));
        props.dispatch(setElementSelected(element.id))
        element.attr('path/stroke','#023E8A');
        element.attr('body/stroke','#023E8A');
        element.attr('top/stroke','#023E8A');
        if (props.toggleContainer && props.isMobileView)
            props.dispatch(setToggleContainer(false))

    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };


    return(
        <>
            <div ref={props.pageRef} className={`${styles.Container}`}
                     onDrop={handleDrop}
                     onDragOver={handleDragOver}
                >
            </div>
        </>
    );
}
export default PaperView