'use client'
import DiagramHeader from "@/components/homePageComponents/diagramHeader/diagramHeader";
import styles from './homePage.module.css'
import OptionsBar from "@/components/homePageComponents/optionsBar/optionsBar";
import ElementsContainer from "@/components/homePageComponents/elementsContainer/elementsContainer";
import ElementDetailContainer from "@/components/homePageComponents/elementDetailContainer/elementDetailContainer";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {HomePageAnimation} from "@/libs/gsap/HomePageAnimation";
import PaperView from "@/components/homePageComponents/paperView/paperView";
import {useContext, useEffect, useRef, useState} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import LinksContainer from "@/components/homePageComponents/linksContainer/linksContainer";
import {dia} from "@joint/core";
import Paper = dia.Paper;
import {viewJoint} from "@/libs/joint/viewJoint";
import {linkViewTools} from "@/libs/joint/linkTools/linkTools";
import ID = dia.Cell.ID;
import {paperEventListener} from "@/libs/joint/paperEventListener";
import ErrorBox from "@/components/errorBox/errorBox";
const HomePage = () =>{

    const graph = useContext(GraphContext);
    const projectTitle = graph.get('projectTitle');

    const [projectInfo, setProjectInfo] = useState({
        name: projectTitle
    })

    useEffect(() => {
        graph.set('projectTitle', projectInfo.name);

    }, [projectInfo]);

    const [elementSelected, setElementSelected] = useState<ID | null>(null)
    const [linkSelected, setLinkSelected] = useState<string>('invocation')
    const setLinkSelectedFn = (link: string) => setLinkSelected(link)
    const setElementSelectedFn = (newElement: string) => setElementSelected(newElement);
    const [connectionMode, setConnectionMode] = useState(false);
    const setConnectionModeFn = (mode: boolean) => setConnectionMode(mode)
    const setProjectInfoFn = (project: {name: string}) => setProjectInfo(project)
    const paperRef = useRef<HTMLDivElement>(null);
    const [paper, setPaper] = useState<Paper | null>(null)
    const [errorBox, setErrorBox] = useState<{
        message: string | null,
        trigger: boolean
    }>({
        message: null,
        trigger: false
    });
    const setErrorBoxFn = (error: string | null) => setErrorBox({
        message: error,
        trigger: !errorBox.trigger
    })

    useEffect(() => {
        if (paperRef.current){
            setPaper(viewJoint(paperRef.current, graph, linkSelected))
        }
    },[linkSelected]);


    useEffect(() => {
        if (paper){
            paperEventListener({
                elementSelected,
                setElementSelectedFn,
                paper,
                graph,
                connectionMode
            })
        }
    });

    useGSAP(()=>{
        const ctx = gsap.context(()=>{
            HomePageAnimation()
        })

        return () => ctx.revert()
    })

    return(
        <>
            <div className={`${styles.Container} ContainerAnimation`}>
              <div className={`${styles.TopBar}`}>
                  <DiagramHeader name={projectInfo.name} setProjectInfo={setProjectInfoFn} setConnectionMode={setConnectionModeFn}  />
                  <OptionsBar paper={paper} paperRef={paperRef.current} name={projectInfo.name}  connectionMode={connectionMode}  elementSelected={elementSelected} setConnectionMode={setConnectionModeFn} setElementSelected={setElementSelectedFn} />
              </div>
                <div className={`${styles.ContentDiv}`}>
                    <div className={`${styles.LeftSide}`}>
                        {
                            connectionMode
                                ? <LinksContainer linkSelected={linkSelected} setLinkSelected={setLinkSelectedFn} />
                                : <ElementsContainer setConnectionMode={setConnectionModeFn} />
                        }
                    </div>
                    <div className={`${styles.Middle}`}>
                            <PaperView pageRef={paperRef}/>
                    </div>
                    <div className={`${styles.RightSide}`}>
                        <ElementDetailContainer setErrorBox={setErrorBoxFn}  elementSelected={elementSelected} setElementSelected={setElementSelectedFn} />
                    </div>
                </div>
            </div>
            <ErrorBox trigger={errorBox.trigger}  setErrorBox={setErrorBoxFn} alert={errorBox.message} />
        </>
    );
}
export default HomePage