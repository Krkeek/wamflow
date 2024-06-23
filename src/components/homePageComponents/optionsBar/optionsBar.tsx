'use client'
import styles from './optionsBar.module.css'
import Image from "next/image";
import {MutableRefObject, useContext, useEffect, useRef} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {exportJSON} from "@/libs/converterJSON";
import {activeConnectionMode, deactivateConnectionMode} from "@/libs/activeConnectionMode";
import {exportPNG} from "@/libs/converterPNG";
import {exportRDF} from "@/libs/converterRDF";
import {dia} from "@joint/core";
import ID = dia.Cell.ID;
import Paper = dia.Paper;
import ExportWrapper from "@/components/homePageComponents/optionsBar/exportWrapper/exportWrapper";

type propsType = {
    connectionMode: boolean,
    setConnectionMode: (mode: boolean) => void,
    name: string,
    elementSelected : ID | null,
    setElementSelected : (el: any) => void,
    paperRef: HTMLDivElement | null,
    paper: Paper | null,
    isMobileView: boolean

}

const OptionsBar = (props: propsType) =>{
    const graph = useContext(GraphContext);


    useEffect(() => {
        if (props.connectionMode){
            activeConnectionMode(graph)
        }
        else {
            deactivateConnectionMode(graph)
        }

    }, [props.connectionMode]);


    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.LeftSide}`}>
                    <button onClick={()=>{props.setConnectionMode(false)}} className={`${styles.ModeButtons} ${!props.connectionMode ? styles.ModeButtonActive : ' '}`}>Elements</button>
                    <button onClick={()=>{props.setConnectionMode(true)}} className={`${styles.ModeButtons} ${props.connectionMode ? styles.ModeButtonActive : ' '}`}>Connections</button>

                </div>
                {
                    !props.isMobileView ?
                        <ExportWrapper  elementSelected={props.elementSelected} name={props.name} paper={props.paper} paperRef={props.paperRef} setConnectionMode={props.setConnectionMode} setElementSelected={props.setElementSelected}/>
:
                        <div className={`${styles.RightSide}`}>
                            <button
                                className={`${styles.MoreButton}`}>Create
                             </button>
                        </div>
                }
            </div>
        </>
    );
}
export default OptionsBar