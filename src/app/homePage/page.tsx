'use client'
import { useContext, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { setMobileView } from "@/libs/redux/features/mobileViewSlice";
import { setProjectInfo } from "@/libs/redux/features/projectInfoSlice";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {dia} from "@joint/core";
import DiagramHeader from "@/components/homePageComponents/diagramHeader/diagramHeader";
import OptionsBar from "@/components/homePageComponents/optionsBar/optionsBar";
import ElementsContainer from "@/components/homePageComponents/elementsContainer/elementsContainer";
import ElementDetailContainer from "@/components/homePageComponents/elementDetailContainer/elementDetailContainer";
import PaperView from "@/components/homePageComponents/paperView/paperView";
import LinksContainer from "@/components/homePageComponents/linksContainer/linksContainer";
import ErrorBox from "@/components/errorBox/errorBox";

import { GraphContext } from "@/libs/joint/GraphContext";
import { viewJoint } from "@/libs/joint/viewJoint";
import { paperEventListener } from "@/libs/joint/paperEventListener";
import { HomePageAnimation } from "@/libs/gsap/HomePageAnimation";

import Paper = dia.Paper;
import styles from './homePage.module.css';
import {setToggleContainer} from "@/libs/redux/features/mobileToggleContainerSlice";
import AccountSetting from "@/components/homePageComponents/accountSetting/acountSetting";

const HomePage = () =>{
    const graph = useContext(GraphContext);
    const isMobileView = useAppSelector(state => state.mobileView.value)
    const dispatch = useAppDispatch()
    const connectionMode = useAppSelector(state => state.connectionMode.value)
    const projectName = useAppSelector(state => state.projectInfo.name)
    const elementSelected = useAppSelector(state => state.elementSelected.value)
    const linkSelected = useAppSelector(state => state.linkSelected.value)
    const toggleContainer = useAppSelector(state => state.toggleContainer.value)
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
                connectionMode,
                isMobileView,
                toggleContainer
            })
        }


        return () => {
            // I clean up event listeners on unmount or before rerunning useEffect
            if (paper){
                paper.off('element:pointerdown');
                paper.off('blank:pointerclick');
                paper.off('link:mouseenter');
                paper.off('blank:mouseover');
            }
        };

    });

    useGSAP(()=>{
        const ctx = gsap.context(()=>{
            HomePageAnimation()
        })
        return () => ctx.revert()
    })

    const handleCloseContainer = () =>{
        if (toggleContainer && isMobileView){
            dispatch(setToggleContainer(false))

        }
    }

    return(
        <>
            <div className={`${styles.Container} ContainerAnimation`}>
                <div className={`${styles.TopBar} ${toggleContainer && isMobileView && styles.ContainerBlur}` } onClick={handleCloseContainer}>
                  <DiagramHeader paper={paper} paperRef={paperRef.current} />
                  <OptionsBar  paper={paper} paperRef={paperRef.current}/>
                  <AccountSetting />

              </div>
                <div className={`${styles.ContentDiv}`}>
                    <div className={`${!isMobileView ? styles.LeftSide : styles.MobileContainers}` } style={toggleContainer && isMobileView ? {display: 'flex'} : {display: "none"} }>
                        {
                            connectionMode
                                ? <LinksContainer />
                                : <ElementsContainer  />
                        }
                    </div>
                    <div className={`${styles.Middle} ${toggleContainer && isMobileView && styles.ContainerBlur}`}   onClick={handleCloseContainer}>
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