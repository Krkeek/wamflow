'use client'
import styles from './optionsBar.module.css'
import Image from "next/image";
import {useState} from "react";

type propsType = {
    connectionMode: boolean,
    setConnectionMode: (mode: boolean) => void
}

const OptionsBar = (props: propsType) =>{

    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.LeftSide}`}>
                    <button onClick={()=>{props.setConnectionMode(false)}} className={`${styles.ModeButtons} ${!props.connectionMode ? styles.ModeButtonActive : ' '}`}>Elements</button>
                    <button onClick={()=>{props.setConnectionMode(true)}} className={`${styles.ModeButtons} ${props.connectionMode ? styles.ModeButtonActive : ' '}`}>Connections</button>

                </div>
                <div className={`${styles.RightSide}`}>
                    <button className={`${styles.ExportButton}`}>Export<Image src={'/assets/export.webp'} alt={'export'} width={15} height={15} /></button>

                </div>

            </div>
        </>
    );
}
export default OptionsBar