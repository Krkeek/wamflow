import styles from './exportWrapper.module.css'
import Image from "next/image";
import { useRef} from "react";
import MobileExportList from "@/components/mobileExportList/mobileExportList";


const ExportWrapper = () =>{
    const exportList = useRef<HTMLDivElement | null>(null)
    const handleExtendExport = (status: boolean) =>{
        if (status){
            if (exportList){
                if (exportList.current)
                exportList.current.classList.add(styles.ActiveExportList)
            }
        }
        else {
            if (exportList){
                if (exportList.current)
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
                    <MobileExportList />

                </div>
            </div>

        </>
    );
}

export default ExportWrapper