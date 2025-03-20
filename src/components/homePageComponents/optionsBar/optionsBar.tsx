'use client'
import styles from './optionsBar.module.css'
import { useContext, useEffect} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {activeConnectionMode, deactivateConnectionMode} from "@/libs/activeConnectionMode";
import ExportWrapper from "@/components/homePageComponents/optionsBar/exportWrapper/exportWrapper";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setConnectionMode} from "@/libs/redux/features/connectionModeSlice";
import useUpdateProjectTitle from "@/utils/hooks/useUpdateProjectTitle";


const OptionsBar = () =>{
    const dispatch = useAppDispatch()
    const graph = useContext(GraphContext);
    const connectionMode = useAppSelector(state => state.connectionMode.value)
    useUpdateProjectTitle()

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
                    <button onClick={() => {
                        dispatch(setConnectionMode(false))
                    }} className={`${styles.ModeButtons} ${!connectionMode ? styles.ModeButtonActive : ' '}`}>Elements
                    </button>
                    <button onClick={() => {
                        dispatch(setConnectionMode(true))
                    }} className={`${styles.ModeButtons} ${connectionMode ? styles.ModeButtonActive : ' '}`}>Connections
                    </button>
                </div>
                        <ExportWrapper />
            </div>

        </>
    );
}
export default OptionsBar