import styles from './exportWrapper.module.css'
import Image from "next/image";
import { useRef} from "react";
import {dia} from "@joint/core";
import Paper = dia.Paper;

import MobileExportList from "@/components/mobileExportList/mobileExportList";



type PropsType = {
    paperRef: HTMLDivElement | null,
    paper: Paper | null
}

const ExportWrapper = (props: PropsType) =>{
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
            <div className={`${styles.RightSide}`} onMouseLeave={() => handleExtendExport(false)}>
                <button
                    onClick={() => handleExtendExport(true)}


                    className={`${styles.ExportButton}`}>Export<Image
                    src={'/assets/export.webp'} alt={'export'} width={15} height={15}/></button>
                <div ref={exportList} className={`${styles.ExtendDiv}`}

                >
                    <button
                        className={`${styles.ExportButton} ${styles.ExportButtonExtended} ${styles.ActiveExportList}`}>Export
                        as
                    </button>
                    <MobileExportList paperRef={props.paperRef} paper={props.paper}/>

                </div>
            </div>

        </>
    );
}

export default ExportWrapper