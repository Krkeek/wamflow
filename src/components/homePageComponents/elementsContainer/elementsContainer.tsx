'use client'
import styles from './elementsContainer.module.css'
import {ShapesData} from "../../../../dataEntry";
import Element from "@/components/homePageComponents/elementsContainer/element/element";
import {createJointElement} from "@/libs/joint/createJointElement";
import {useContext} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {useAppDispatch} from "@/libs/redux/hooks";
import {setConnectionMode} from "@/libs/redux/features/connectionModeSlice";


const ElementsContainer = () =>{

    const dispatch = useAppDispatch()


    const graph = useContext(GraphContext);
        const handleCreateElement = (elementId: string) =>{
                dispatch(setConnectionMode(false))
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