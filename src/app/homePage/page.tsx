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
    const setElementSelectedFn = (newElement: string) => setElementSelected(newElement);
    const [connectionMode, setConnectionMode] = useState(false);
    const setConnectionModeFn = (mode: boolean) => setConnectionMode(mode)
    const setProjectInfoFn = (project: {name: string}) => setProjectInfo(project)
    useEffect(()=>{
        const el = graph.getCell(elementSelected);
        console.log(el)
    },[elementSelected])

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
                  <DiagramHeader name={projectInfo.name} setProjectInfo={setProjectInfoFn}  />
                  <OptionsBar name={projectInfo.name}  connectionMode={connectionMode}  elementSelected={elementSelected} setConnectionMode={setConnectionModeFn} setElementSelected={setElementSelectedFn} />
              </div>
                <div className={`${styles.ContentDiv}`}>
                    <div className={`${styles.LeftSide}`}>
                        <ElementsContainer setConnectionMode={setConnectionModeFn} />
                    </div>
                    <div className={`${styles.Middle}`}>
                        <PaperView connectionMode={connectionMode} elementSelected={elementSelected} setElementSelected={setElementSelectedFn}/>
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