
import styles from './diagramHeader.module.css'
import Image from "next/image";
import {useContext, useRef} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {importJSON} from "@/libs/converterJSON";

type DiagramHeaderProps = {
    name: string,
    setProjectInfo: (project: {name: string}) => void,
    setConnectionMode: (mode: boolean) => void
}
const DiagramHeader = (props: DiagramHeaderProps) =>{
    const inputFile = useRef(null);
    const graph = useContext(GraphContext);
    const titleInput = useRef(null)

    const handleImport = () =>{
        // @ts-ignore
        inputFile.current.click();
    }

    const handleFileChange = async (files: FileList | null) => {
        props.setConnectionMode(false);
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type === 'application/json'){
                await importJSON(graph, file);
                props.setProjectInfo({
                    name: graph.get('projectTitle')
                });
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
                    <input ref={titleInput} className={`${styles.Title}`} placeholder={props.name}
                           onChange={(e) => props.setProjectInfo({name: e.target.value})}/>
                </div>
                <button onClick={handleImport} className={`${styles.Import}`}><Image className={`${styles.Logo}`} src={'/assets/import.webp'}
                                                              alt={'logo'} width={20} height={20}/></button>
                <input onChange={(e) => handleFileChange(e.target.files)} ref={inputFile} className={`${styles.InputFile}`} type="file" multiple={false} accept={'.json,.rdf'}/>
            </div>

        </>
    );
}

export default DiagramHeader