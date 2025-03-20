'use client'
import styles from './elementsContainer.module.css'
import {ShapesData} from "../../../../dataEntry";
import Element from "@/components/homePageComponents/elementsContainer/element/element";
import React from "react";
import {useAppDispatch} from "@/libs/redux/hooks";
import {setConnectionMode} from "@/libs/redux/features/connectionModeSlice";


const ElementsContainer = () =>{

    const dispatch = useAppDispatch()
    const handleDragStart = (e: React.DragEvent, elementId: string) => {
        e.dataTransfer.setData("elementId", elementId);
        dispatch(setConnectionMode(false));
    };

    return(
        <>
            <div className={`${styles.Container}`}>
                {
                ShapesData.map((shape, index)=>(
                    <Element key={index} shape={shape} handleDragStart={handleDragStart}/>
                ))
                }
            </div>
        </>
    )
}
export default ElementsContainer