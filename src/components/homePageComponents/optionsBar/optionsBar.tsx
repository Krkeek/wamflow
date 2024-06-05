'use client'
import styles from './optionsBar.module.css'
import Image from "next/image";
import {MutableRefObject, useContext, useEffect, useRef} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {exportJSON} from "@/libs/converterJSON";
import {activeConnectionMode, deactivateConnectionMode} from "@/libs/activeConnectionMode";
import {exportPNG} from "@/libs/converterPNG";

type propsType = {
    connectionMode: boolean,
    setConnectionMode: (mode: boolean) => void,
    name: string,
    elementSelected : string | null,
    setElementSelected : (el: any) => void,
    paperRef: HTMLDivElement | null

}

const OptionsBar = (props: propsType) =>{
    const graph = useContext(GraphContext);
    const exportList = useRef(null)


    useEffect(() => {
        if (props.connectionMode){
            activeConnectionMode(graph)
        }
        else {
            deactivateConnectionMode(graph)
        }

    }, [props.connectionMode]);


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
        exportJSON(graph, props.name);
    }


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
        exportPNG(props.paperRef, props.name)
    }

    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.LeftSide}`}>
                    <button onClick={()=>{props.setConnectionMode(false)}} className={`${styles.ModeButtons} ${!props.connectionMode ? styles.ModeButtonActive : ' '}`}>Elements</button>
                    <button onClick={()=>{props.setConnectionMode(true)}} className={`${styles.ModeButtons} ${props.connectionMode ? styles.ModeButtonActive : ' '}`}>Connections</button>

                </div>
                <div className={`${styles.RightSide}`}   onMouseLeave={()=> handleExtendExport(false)}>
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
                            className={`${styles.ExtendElement}`}>RDF
                        </button>
                        <button onClick={handleExportPNG}
                            className={`${styles.ExtendElement}`}>PNG
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}
export default OptionsBar