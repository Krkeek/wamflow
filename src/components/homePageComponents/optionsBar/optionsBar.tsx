'use client'
import styles from './optionsBar.module.css'
import Image from "next/image";
import {useState} from "react";

const OptionsBar = () =>{

    const [connectionMode, setConnectionMode] = useState(false)

    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.LeftSide}`}>
                    <button onClick={()=>{setConnectionMode(false)}} className={`${styles.ModeButtons} ${!connectionMode ? styles.ModeButtonActive : ' '}`}>Elements</button>
                    <button onClick={()=>{setConnectionMode(true)}} className={`${styles.ModeButtons} ${connectionMode ? styles.ModeButtonActive : ' '}`}>Connections</button>

                </div>
                <div className={`${styles.RightSide}`}>
                    <button className={`${styles.ExportButton}`}>Export<Image src={'/assets/export.webp'} alt={'export'} width={15} height={15} /></button>

                </div>

            </div>
        </>
    );
}
export default OptionsBar