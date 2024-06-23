import styles from './exportWrapper.module.css'
import Image from "next/image";
import {exportPNG} from "@/libs/converterPNG";
import {exportRDF} from "@/libs/converterRDF";
import {exportJSON} from "@/libs/converterJSON";
import {useContext, useRef} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {dia} from "@joint/core";
import Paper = dia.Paper;
import ID = dia.Cell.ID;
import {deactivateConnectionMode} from "@/libs/activeConnectionMode";



type PropsType = {
    setConnectionMode: (mode: boolean) => void,
    name: string,
    elementSelected : ID | null,
    setElementSelected : (el: any) => void,
    paperRef: HTMLDivElement | null,
    paper: Paper | null
}

const ExportWrapper = (props: PropsType) =>{
    const graph = useContext(GraphContext);
    const exportList = useRef(null)


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
        exportPNG(props.paperRef, props.paper, props.name)
    }


    const handleExportRDF = () =>{
        reset();
        exportRDF(graph)
    }

    const reset = () =>{
        props.setConnectionMode(false);
        deactivateConnectionMode(graph);
        const prevElement = graph.getCell(props.elementSelected);
        if (prevElement){
            prevElement.attr('path/stroke','black');
            prevElement.attr('body/stroke','black');
            prevElement.attr('top/stroke','black');

        }
        props.setElementSelected(null)
    }

    const handleExportJSON = () =>{
        reset();

        exportJSON(graph,props.name);
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