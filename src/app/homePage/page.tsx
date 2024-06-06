'use client'
import DiagramHeader from "@/components/homePageComponents/diagramHeader/diagramHeader";
import styles from './homePage.module.css'
import OptionsBar from "@/components/homePageComponents/optionsBar/optionsBar";
import ElementsContainer from "@/components/homePageComponents/elementsContainer/elementsContainer";
import ElementDetailContainer from "@/components/homePageComponents/elementDetailContainer/elementDetailContainer";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {HomePageAnimation} from "@/animation/HomePageAnimation";
import PaperView from "@/components/homePageComponents/paperView/paperView";
import {useContext, useEffect, useRef, useState} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import LinksContainer from "@/components/homePageComponents/linksContainer/linksContainer";
const HomePage = () =>{

    const graph = useContext(GraphContext);
    const projectTitle = graph.get('projectTitle');

    const [projectInfo, setProjectInfo] = useState({
        name: projectTitle
    })

    useEffect(() => {
        graph.set('projectTitle', projectInfo.name)

    }, [projectInfo]);

    const [elementSelected, setElementSelected] = useState<string | null>(null)
    const [linkSelected, setLinkSelected] = useState<string>('invocation')
    const setLinkSelectedFn = (link: string) => setLinkSelected(link)
    const setElementSelectedFn = (newElement: string) => setElementSelected(newElement);
    const [connectionMode, setConnectionMode] = useState(false);
    const setConnectionModeFn = (mode: boolean) => setConnectionMode(mode)
    const setProjectInfoFn = (project: {name: string}) => setProjectInfo(project)
    const paperRef = useRef(null);

    useEffect(() => {
        const cells = graph.getCells()
        console.log(cells)
    }, [elementSelected]);

    // useEffect(()=>{
    //     const el = graph.getCell(elementSelected);
    //     console.log(el)
    // },[elementSelected])
    //
    // useEffect(() => {
    //     const link = graph.getLinks()
    //     console.log(link)
    // }, [linkSelected]);

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
                  <OptionsBar paperRef={paperRef.current} name={projectInfo.name}  connectionMode={connectionMode}  elementSelected={elementSelected} setConnectionMode={setConnectionModeFn} setElementSelected={setElementSelectedFn} />
              </div>
                <div className={`${styles.ContentDiv}`}>
                    <div className={`${styles.LeftSide}`}>
                        {
                            connectionMode
                                ? <LinksContainer linkSelected={linkSelected} setLinkSelected={setLinkSelectedFn} />
                                : <ElementsContainer setConnectionMode={setConnectionModeFn} />
                        }
                    </div>
                    <div  ref={paperRef}  className={`${styles.Middle}`}>
                            <PaperView linkSelected={linkSelected} connectionMode={connectionMode} elementSelected={elementSelected} setElementSelected={setElementSelectedFn}/>
                    </div>
                    <div className={`${styles.RightSide}`}>
                        <ElementDetailContainer  elementSelected={elementSelected} setElementSelected={setElementSelectedFn} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default HomePage