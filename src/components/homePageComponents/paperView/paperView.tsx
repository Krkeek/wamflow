'use client'
import styles from './paperView.module.css'
import {useContext, useEffect, useRef} from "react";
import {viewJoint} from "@/libs/joint/viewJoint";
import {GraphContext} from "@/libs/joint/GraphContext";

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
            //When clicking on an element
            paper.on('element:pointerclick',(cellView)=>{
                if (props.elementSelected !== null){
                    const prevElement = graph.getCell(props.elementSelected);
                    if (prevElement){
                        prevElement.attr('path/stroke','black');
                        prevElement.attr('body/stroke','black');
                        prevElement.attr('top/stroke','black');

                    }
                }
                props.setElementSelected(cellView.model.id);
                cellView.model.attr('path/stroke','#023E8A');
                cellView.model.attr('body/stroke','#023E8A');
                cellView.model.attr('top/stroke','#023E8A');

            })

            //When clicking on a blank place on the paper
            paper.on('blank:pointerclick',()=>{
                const prevElement = graph.getCell(props.elementSelected);
                if (prevElement){
                    prevElement.attr('path/stroke','black');
                    prevElement.attr('body/stroke','black');
                    prevElement.attr('top/stroke','black');

                }
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