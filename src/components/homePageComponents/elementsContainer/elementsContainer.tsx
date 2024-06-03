'use client'
import styles from './elementsContainer.module.css'
import {ShapesData} from "../../../../dataEntry";
import Element from "@/components/homePageComponents/element/element";
import {createJointElement} from "@/libs/joint/createJointElement";
import {useContext, useEffect, useRef} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";

type props = {
    setConnectionMode: (mode: boolean) => void,

}

const ElementsContainer = ( props: props) =>{


    const graph = useContext(GraphContext);
        const handleCreateElement = (elementId: string) =>{
                props.setConnectionMode(false);
               createJointElement(elementId, graph)
        }

    return(
        <>
            <div className={`${styles.Container}`}>
                {
                ShapesData.map((shape, index)=>(
                    <Element key={index} shape={shape} handleCreateElement={handleCreateElement} />
                ))
                }
            </div>
        </>
    )
}
export default ElementsContainer