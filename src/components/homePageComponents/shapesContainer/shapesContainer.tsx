'use client'
import styles from './shapesContainer.module.css'
import {ShapesData} from "../../../../dataEntry";
import Shape from "@/components/homePageComponents/shape/shape";
import {createJointElement} from "@/libs/joint/createJointElement";
import {useContext} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";

const ShapesContainer = () =>{
    const graph = useContext(GraphContext);
    const handleCreateElement = (elementId: string) =>{
           createJointElement(elementId, graph)
    }

    return(
        <>
            <div className={`${styles.Container}`}>
                {
                ShapesData.map((shape, index)=>(
                    <Shape key={index} shape={shape} handleCreateElement={handleCreateElement} />
                ))
                }
            </div>
        </>
    )
}
export default ShapesContainer