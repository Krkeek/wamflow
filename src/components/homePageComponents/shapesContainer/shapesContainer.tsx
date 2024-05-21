'use client'
import styles from './shapesContainer.module.css'
import {ShapesData} from "../../../../dataEntry";
import Shape from "@/components/homePageComponents/shape/shape";
import {createJointElement} from "@/libs/joint/joint";

const ShapesContainer = () =>{
    const handleCreateElement = (elementId: string) =>{
        createJointElement(elementId)
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