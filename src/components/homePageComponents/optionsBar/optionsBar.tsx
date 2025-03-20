'use client'
import styles from './optionsBar.module.css'
import { useContext, useEffect} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {activeConnectionMode, deactivateConnectionMode} from "@/libs/activeConnectionMode";
import {dia} from "@joint/core";
import Paper = dia.Paper;
import ExportWrapper from "@/components/homePageComponents/optionsBar/exportWrapper/exportWrapper";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setConnectionMode} from "@/libs/redux/features/connectionModeSlice";
import {setToggleContainer} from "@/libs/redux/features/mobileToggleContainerSlice";
import {PaperContext} from "@/libs/joint/PaperContext";

type propsType = {

}

const OptionsBar = (props: propsType) =>{
    const graph = useContext(GraphContext);
    const dispatch = useAppDispatch()
    const connectionMode = useAppSelector(state => state.connectionMode.value)
    const mobileView = useAppSelector(state => state.mobileView.value)
    useEffect(() => {
        if (connectionMode){
            activeConnectionMode(graph, mobileView)
        }
        else {
            deactivateConnectionMode(graph)
        }

    }, [connectionMode]);


    const handleButton = () => {
            dispatch(setToggleContainer(true))
    }

    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.LeftSide}`}>
                    <button onClick={() => {
                        dispatch(setConnectionMode(false))
                    }} className={`${styles.ModeButtons} ${!connectionMode ? styles.ModeButtonActive : ' '}`}>Elements
                    </button>
                    <button onClick={() => {
                        dispatch(setConnectionMode(true))
                    }} className={`${styles.ModeButtons} ${connectionMode ? styles.ModeButtonActive : ' '}`}>Connections
                    </button>
                </div>
                {
                    !mobileView ?
                        <ExportWrapper />
                        :
                        <div className={`${styles.RightSide}`}>
                            <button onClick={handleButton} className={`${styles.MoreButton}`}>
                                {
                                    !connectionMode
                                        ? "Create"
                                        : "Choose"

                                }
                             </button>
                        </div>
                }
            </div>

        </>
    );
}
export default OptionsBar