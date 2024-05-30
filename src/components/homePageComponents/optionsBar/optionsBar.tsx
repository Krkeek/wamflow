'use client'
import styles from './optionsBar.module.css'
import Image from "next/image";
import {useContext, useRef} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {exportJSON} from "@/libs/converterJSON";

type propsType = {
    connectionMode: boolean,
    setConnectionMode: (mode: boolean) => void,
    name: string
}

const OptionsBar = (props: propsType) =>{
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
                        <button className={`${styles.ExportButton} ${styles.ExportButtonExtended} ${styles.ActiveExportList}`}>Export
                            as
                        </button>
                        <button onClick={() => exportJSON(graph, props.name)}
                                className={`${styles.ExtendElement}`}>JSON
                        </button>
                        <button
                                className={`${styles.ExtendElement}`}>RDF
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}
export default OptionsBar