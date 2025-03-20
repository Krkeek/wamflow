
import styles from './diagramHeader.module.css'
import Image from "next/image";
import {useContext, useRef, useState} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {importJSON} from "@/libs/converterJSON";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setConnectionMode} from "@/libs/redux/features/connectionModeSlice";
import {setProjectInfo} from "@/libs/redux/features/projectInfoSlice";
import MobileExportList from "@/components/mobileExportList/mobileExportList";
import {dia} from "@joint/core";
import Paper = dia.Paper;
import {setIsLoading} from "@/libs/redux/features/loadingSlice";
import {PaperContext} from "@/libs/joint/PaperContext";

type DiagramHeaderProps = {
}
const DiagramHeader = (props: DiagramHeaderProps) =>{


    const paper = useContext(PaperContext)
    const dispatch = useAppDispatch();
    const projectName = useAppSelector(state => state.projectInfo.name)
    const exportList = useRef(null)
    const inputFile = useRef(null);
    const graph = useContext(GraphContext);
    const titleInput = useRef(null)
    const isMobileView = useAppSelector(state => state.mobileView.value)
    const [extendList, setExtendList] = useState(false);
    const handleImport = () =>{
        dispatch(setIsLoading(true));
        // @ts-ignore
        inputFile.current.click();
        dispatch(setIsLoading(false));

    }

    const handleFileChange = async (files: FileList | null) => {
        dispatch((setConnectionMode(false)))


        if (files && files.length > 0) {
            const file = files[0];
            if (file.type === 'application/json'){
                await importJSON(graph, file);
                dispatch(setProjectInfo(graph.get('projectTitle')))
                    // @ts-ignore
                    titleInput.current.value = ''
            }
        }
    }





    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.LeftDiv}`}>
                    <Image className={`${styles.Logo}`} src={'/assets/logo.webp'} alt={'logo'} width={35} height={35} priority/>
                    <input ref={titleInput} className={`${styles.Title}`} placeholder={projectName}
                           onChange={(e) => dispatch(setProjectInfo(e.target.value))}/>
                </div>
                <button onClick={handleImport} className={`${styles.Import}`}><Image className={`${styles.Logo}`}
                                                                                     src={'/assets/import.webp'}
                                                                                     alt={'logo'} width={20}
                                                                                     height={20}/></button>
                <input onChange={(e) => handleFileChange(e.target.files)} ref={inputFile}
                       className={`${styles.InputFile}`} type="file" multiple={false} accept={'.json'}/>
                <button style={useAppSelector(state => state.mobileView.value) ? {display: "block"} : { display: "none"}} onClick={() => setExtendList(prevState => !prevState)} className={`${styles.Import}`}><Image className={`${styles.Export}`}
                                                                                     src={'/assets/export.webp'}
                                                                                     alt={'logo'} width={20}
                                                                                     height={20}/></button>
            </div>
            {
                isMobileView &&
                <div ref={exportList} className={`${styles.MobileExportListDiv} ${extendList ? styles.ActiveExportList : " " }`}>
                    <MobileExportList />
                </div>
            }
        </>
    );
}

export default DiagramHeader