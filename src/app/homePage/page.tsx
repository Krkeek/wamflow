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
import {paperEventListener} from "@/libs/joint/paperEventListener";
import ErrorBox from "@/components/errorBox/errorBox";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setMobileView} from "@/libs/redux/features/mobileViewSlice";
import {setProjectInfo} from "@/libs/redux/features/projectInfoSlice";

const HomePage = () =>{
    const graph = useContext(GraphContext);
    const isMobileView = useAppSelector(state => state.mobileView.value)
    const dispatch = useAppDispatch()
    const connectionMode = useAppSelector(state => state.connectionMode.value)
    const projectName = useAppSelector(state => state.projectInfo.name)
    const elementSelected = useAppSelector(state => state.elementSelected.value)
    const linkSelected = useAppSelector(state => state.linkSelected.value)
    const paperRef = useRef<HTMLDivElement>(null);
    const [paper, setPaper] = useState<Paper | null >(null)

    useEffect(() => {
        if (paperRef.current){
            setPaper(viewJoint(paperRef.current, graph, linkSelected, isMobileView ))
        }
    },[linkSelected]);

    useEffect(() => {
        graph.set('projectTitle', projectName);
    }, [projectName]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            dispatch(setMobileView(window.innerWidth <= 768))
        }

        const projectTitle = graph.get('projectTitle');
        dispatch(setProjectInfo(projectTitle))

        if (paper){
            paperEventListener({
                elementSelected,
                dispatch,
                paper,
                graph,
                connectionMode
            })
        }

    }, []);

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
                  <DiagramHeader />
                  <OptionsBar  paper={paper} paperRef={paperRef.current} />
              </div>
                <div className={`${styles.ContentDiv}`}>
                    <div className={`${styles.LeftSide}`}>
                        {
                            connectionMode
                                ? <LinksContainer />
                                : <ElementsContainer  />
                        }
                    </div>
                    <div className={`${styles.Middle}`}>
                            <PaperView pageRef={paperRef}/>
                    </div>
                    <div className={`${styles.RightSide}`}>
                        <ElementDetailContainer  />
                    </div>
                </div>
            </div>
            <ErrorBox />

        </>
    );
}
export default HomePage