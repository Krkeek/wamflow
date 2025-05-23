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
import {setLinkSelected} from "@/libs/redux/features/linkSelectedSlice";
import {PaperContext} from "@/libs/joint/PaperContext";



const MobileExportList = () =>{

    const graph = useContext(GraphContext);
    const paper = useContext(PaperContext);
    const dispatch = useAppDispatch()
    const projectName = useAppSelector(state => state.projectInfo.name)
    const elementSelected = useAppSelector(state => state.elementSelected.value)
    const linkSelected = useAppSelector(state => state.linkSelected.value)


    const handleExportPNG = () =>{
        reset();
        exportPNG(paper, projectName, graph)
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
        if (linkSelected !== null){
            const prevLink = graph.getCell(linkSelected);
            if (prevLink){
                prevLink.attr('line/stroke','black');
            }
            dispatch(setLinkSelected(null))
        }

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