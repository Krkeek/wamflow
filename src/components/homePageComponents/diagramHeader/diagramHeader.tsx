
import styles from './diagramHeader.module.css'
import Image from "next/image";
import {useContext, useRef} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {importJSON} from "@/libs/converterJSON";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setConnectionMode} from "@/libs/redux/features/connectionModeSlice";
import {setProjectInfo} from "@/libs/redux/features/projectInfoSlice";
import {setIsLoading} from "@/libs/redux/features/loadingSlice";

const DiagramHeader = () =>{

    const dispatch = useAppDispatch();
    const graph = useContext(GraphContext);
    const projectName = useAppSelector(state => state.projectInfo.name)
    const inputFile = useRef<HTMLInputElement | null>(null);
    const titleInput = useRef<HTMLInputElement | null>(null);
    const handleImport = () =>{
        dispatch(setIsLoading(true));
        if (inputFile.current)
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
                if (titleInput.current)
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
            </div>
        </>
    );
}

export default DiagramHeader