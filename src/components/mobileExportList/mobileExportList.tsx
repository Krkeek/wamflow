import styles from './mobileExportList.module.css'
import {exportPNG} from "@/libs/converterPNG";
import {exportRDF} from "@/libs/converterRDF";
import {setConnectionMode} from "@/libs/redux/features/connectionModeSlice";
import {deactivateConnectionMode} from "@/libs/activeConnectionMode";
import {setElementSelected} from "@/libs/redux/features/elementSelectedSlice";
import {exportJSON} from "@/libs/converterJSON";
import {useContext, useRef} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {dia} from "@joint/core";
import Paper = dia.Paper;

type PropsType = {
    paperRef: HTMLDivElement | null | any,
    paper: Paper | null
}


const MobileExportList = (props: PropsType) =>{

    const graph = useContext(GraphContext);
    const dispatch = useAppDispatch()
    const projectName = useAppSelector(state => state.projectInfo.name)
    const elementSelected = useAppSelector(state => state.elementSelected.value)


    const handleExportPNG = () =>{
        reset();
        exportPNG(props.paperRef, props.paper, projectName)
    }


    const handleExportRDF = () =>{
        reset();
        exportRDF(graph, projectName)
    }

    const reset = () =>{
        //props.setConnectionMode(false);
        dispatch(setConnectionMode(false))
        deactivateConnectionMode(graph);
        const prevElement = graph.getCell(elementSelected);
        if (prevElement){
            prevElement.attr('path/stroke','black');
            prevElement.attr('body/stroke','black');
            prevElement.attr('top/stroke','black');

        }
        dispatch(setElementSelected(null))
    }

    const handleExportJSON = () =>{
        reset();
        exportJSON(graph,projectName);
    }



    return(
        <>
            <button onClick={handleExportJSON}
                    className={`${styles.ExtendElement}`}>JSON
            </button>
            <button
                onClick={handleExportRDF}
                className={`${styles.ExtendElement}`}>RDF
            </button>
            <button onClick={handleExportPNG}
                    className={`${styles.ExtendElement}`}>PNG
            </button>
        </>
    );
}
export default MobileExportList