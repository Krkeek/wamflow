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
import PaperView from "@/components/homePageComponents/paperView/paperView";
import LinksContainer from "@/components/homePageComponents/linksContainer/linksContainer";
import NotificationBox from "@/components/infrastructure/notificationBox/notificationBox";

import { GraphContext } from "@/libs/joint/GraphContext";
import { viewJoint } from "@/libs/joint/viewJoint";
import { paperEventListener } from "@/libs/joint/paperEventListener";
import { HomePageAnimation } from "@/libs/gsap/HomePageAnimation";

import Paper = dia.Paper;
import styles from './homePage.module.css';
import {setToggleContainer} from "@/libs/redux/features/mobileToggleContainerSlice";
import AccountSetting from "@/components/homePageComponents/accountSetting/accountSetting";
import ConfirmDialog from "@/components/infrastructure/confirmDialog/confirmDialog";
import {getUserStatus} from "@/utils/getUserStatus";
import RegisterDialog from "@/components/registerDialog/registerDialog";
import {IGetUserStatus} from "../../../declarations";
import {setUserStatus} from "@/libs/redux/features/userStatusSlice";
import LoadingDialog from "@/components/infrastructure/loadingDialog/loadingDialog";
import RightSideWrapper from "@/components/rightSideWrapper/rightSideWrapper";


const HomePage = () =>{
    const graph = useContext(GraphContext);
    const isMobileView = useAppSelector(state => state.mobileView.value)
    const dispatch = useAppDispatch()
    const connectionMode = useAppSelector(state => state.connectionMode.value)
    const projectName = useAppSelector(state => state.projectInfo.name)
    const elementSelected = useAppSelector(state => state.elementSelected.value)
    const linkName = useAppSelector(state => state.linkName.value)
    const linkSelected = useAppSelector(state => state.linkSelected.value)

    const toggleContainer = useAppSelector(state => state.toggleContainer.value)
    const paperRef = useRef<HTMLDivElement>(null);
    const [paper, setPaper] = useState<Paper | null >(null)
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);


    useEffect(() => {
        const userStatus:IGetUserStatus = getUserStatus();
        dispatch(setUserStatus(userStatus));

    }, []);

    useEffect(() => {
        if (paperRef.current){
            setPaper(viewJoint(paperRef.current, graph, linkName, isMobileView ))
        }
    },[linkName]);

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
                linkSelected,
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
                  <AccountSetting setOpenRegisterDialog={setOpenRegisterDialog} />

              </div>
                <div className={`${styles.ContentDiv}`}>
                    <div className={`${!isMobileView ? styles.LeftSide : styles.MobileContainers}` } style={toggleContainer && isMobileView ? {display: 'flex'} : {display: "none"} }>
                        {
                            connectionMode
                                ? <LinksContainer />
                                : <ElementsContainer  />
                        }
                    </div>
                    <div className={`${styles.Middle} ${toggleContainer && isMobileView && styles.ContainerBlur}`}
                         onClick={handleCloseContainer}>
                        <div className={`${styles.DragSentence}`}>Drop Sheet</div>

                        <div  className={`${styles.MiddlePaper}`} >
                            <PaperView isMobileView={isMobileView} toggleContainer={toggleContainer} dispatch={dispatch} elementSelected={elementSelected} paper={paper} pageRef={paperRef}/>
                        </div>
                    </div>
                    <div className={`${styles.RightSide}`}>
                        <RightSideWrapper paper={paper} />
                    </div>
                </div>
            </div>
            <NotificationBox />
            <ConfirmDialog />
            <RegisterDialog isOpen={openRegisterDialog} setIsOpenAction={setOpenRegisterDialog}/>
            <LoadingDialog />

        </>
    );
}
export default HomePage