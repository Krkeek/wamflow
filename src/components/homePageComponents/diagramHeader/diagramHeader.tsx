
import styles from './diagramHeader.module.css'
import Image from "next/image";
import {useContext, useEffect, useRef} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {importJSON} from "@/libs/converterJSON";
import {useDispatch} from "react-redux";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {display} from "html2canvas/dist/types/css/property-descriptors/display";
import {setConnectionMode} from "@/libs/redux/features/connectionModeSlice";
import {setProjectInfo} from "@/libs/redux/features/projectInfoSlice";

type DiagramHeaderProps = {
}
const DiagramHeader = (props: DiagramHeaderProps) =>{

    const dispatch = useAppDispatch();
    const projectName = useAppSelector(state => state.projectInfo.name)

    const inputFile = useRef(null);
    const graph = useContext(GraphContext);
    const titleInput = useRef(null)

    const handleImport = () =>{
        // @ts-ignore
        inputFile.current.click();
    }

    const handleFileChange = async (files: FileList | null) => {
        // props.setConnectionMode(false);
        dispatch((setConnectionMode(false)))


        if (files && files.length > 0) {
            const file = files[0];
            if (file.type === 'application/json'){
                await importJSON(graph, file);
                // props.setProjectInfo({
                //     name: graph.get('projectTitle')
                // });
                dispatch(setProjectInfo(graph.get('projectTitle')))
                    // @ts-ignore
                    titleInput.current.value = ''
            }
            else {
                // importRdf(graph, file);
            }

        }
    }



    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.LeftDiv}`}>
                    <Image className={`${styles.Logo}`} src={'/assets/logo.webp'} alt={'logo'} width={35} height={35}/>
                    <input ref={titleInput} className={`${styles.Title}`} placeholder={projectName}
                           onChange={(e) => dispatch(setProjectInfo(e.target.value))}/>
                </div>
                <button onClick={handleImport} className={`${styles.Import}`}><Image className={`${styles.Logo}`}
                                                                                     src={'/assets/import.webp'}
                                                                                     alt={'logo'} width={20}
                                                                                     height={20}/></button>
                <input onChange={(e) => handleFileChange(e.target.files)} ref={inputFile}
                       className={`${styles.InputFile}`} type="file" multiple={false} accept={'.json'}/>
                <button style={useAppSelector(state => state.mobileView.value) ? {display: "block"} : { display: "none"}} onClick={() => {}} className={`${styles.Import}`}><Image className={`${styles.Export}`}
                                                                                     src={'/assets/export.webp'}
                                                                                     alt={'logo'} width={20}
                                                                                     height={20}/></button>
            </div>

        </>
    );
}

export default DiagramHeader