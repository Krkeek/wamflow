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
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setConnectionMode} from "@/libs/redux/features/connectionModeSlice";

type propsType = {
    paperRef: HTMLDivElement | null,
    paper: Paper | null,

}

const OptionsBar = (props: propsType) =>{
    const graph = useContext(GraphContext);
    const dispatch = useAppDispatch()
    const connectionMode = useAppSelector(state => state.connectionMode.value)
    const mobileView = useAppSelector(state => state.mobileView.value)
    useEffect(() => {
        if (connectionMode){
            activeConnectionMode(graph)
        }
        else {
            deactivateConnectionMode(graph)
        }

    }, [connectionMode]);


    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.LeftSide}`}>
                    <button onClick={()=>{dispatch(setConnectionMode(false))}} className={`${styles.ModeButtons} ${!connectionMode ? styles.ModeButtonActive : ' '}`}>Elements</button>
                    <button onClick={()=>{dispatch(setConnectionMode(true))}} className={`${styles.ModeButtons} ${connectionMode ? styles.ModeButtonActive : ' '}`}>Connections</button>

                </div>
                {
                    !mobileView ?
                        <ExportWrapper  paper={props.paper} paperRef={props.paperRef} />
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