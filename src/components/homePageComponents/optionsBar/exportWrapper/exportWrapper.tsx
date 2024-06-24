import styles from './exportWrapper.module.css'
import Image from "next/image";
import {exportPNG} from "@/libs/converterPNG";
import {exportRDF} from "@/libs/converterRDF";
import {exportJSON} from "@/libs/converterJSON";
import {useContext, useEffect, useRef} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {dia} from "@joint/core";
import Paper = dia.Paper;
import ID = dia.Cell.ID;
import {deactivateConnectionMode} from "@/libs/activeConnectionMode";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setConnectionMode} from "@/libs/redux/features/connectionModeSlice";
import {setElementSelected} from "@/libs/redux/features/elementSelectedSlice";



type PropsType = {
    paperRef: HTMLDivElement | null,
    paper: Paper | null
}

const ExportWrapper = (props: PropsType) =>{
    const graph = useContext(GraphContext);
    const exportList = useRef(null)
    const dispatch = useAppDispatch()
    const projectName = useAppSelector(state => state.projectInfo.name)
    const elementSelected = useAppSelector(state => state.elementSelected.value)

    const handleExtendExport = (status: boolean) =>{
        if (status){
            if (exportList){
                // @ts-ignore
                exportList.current.classList.add(styles.ActiveExportList)
            }
        }
        else {
            if (exportList){
                // @ts-ignore
                exportList.current.classList.remove(styles.ActiveExportList)
            }

        }

    }

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
            <div className={`${styles.RightSide}`} onMouseLeave={() => handleExtendExport(false)}>
                <button
                    onMouseEnter={() => handleExtendExport(true)}


                    className={`${styles.ExportButton}`}>Export<Image
                    src={'/assets/export.webp'} alt={'export'} width={15} height={15}/></button>
                <div ref={exportList} className={`${styles.ExtendDiv}`}

                >
                    <button
                        className={`${styles.ExportButton} ${styles.ExportButtonExtended} ${styles.ActiveExportList}`}>Export
                        as
                    </button>
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
                </div>
            </div>
        </>
    );
}

export default ExportWrapper