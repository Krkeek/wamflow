'use client'
import {lazy, memo, useState} from "react";
import { useAppSelector } from "@/libs/redux/hooks";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import DiagramHeader from "@/components/homePageComponents/diagramHeader/diagramHeader";
import OptionsBar from "@/components/homePageComponents/optionsBar/optionsBar";
import ElementsContainer from "@/components/homePageComponents/elementsContainer/elementsContainer";
import PaperView from "@/components/homePageComponents/paperView/paperView";
import LinksContainer from "@/components/homePageComponents/linksContainer/linksContainer";
import { HomePageAnimation } from "@/libs/gsap/HomePageAnimation";
import styles from './homePage.module.css';
import AccountSetting from "@/components/homePageComponents/accountSetting/accountSetting";
import RightSideWrapper from "@/components/rightSideWrapper/rightSideWrapper";
import usePreventBackButton from "@/utils/hooks/usePreventBackButton";
import useFetchUserStatus from "@/utils/hooks/useFetchUserStatus";
import useAttachEventListeners from "@/utils/hooks/useAttachEventListeners";
import {dia} from "@joint/core";
import usePaper from "@/utils/hooks/usePaper";
import { PaperContext } from "@/libs/joint/PaperContext";
const NotificationBox = lazy(() => import('@/components/infrastructure/notificationBox/notificationBox'));
const ConfirmDialog = lazy(() => import('@/components/infrastructure/confirmDialog/confirmDialog'));
const RegisterDialog = lazy(() => import('@/components/registerDialog/registerDialog'));
const LoadingDialog = lazy(() => import('@/components/infrastructure/loadingDialog/loadingDialog'));

const HomePage = memo(() =>{


    const connectionMode = useAppSelector(state => state.connectionMode.value)
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const paper: dia.Paper | null = usePaper();

    usePreventBackButton();
    useFetchUserStatus();
    useAttachEventListeners(paper);

    useGSAP(()=>{
        const ctx = gsap.context(()=>{
            HomePageAnimation()
        })
        return () => ctx.revert()
    })

    return(
            <>
                <PaperContext.Provider value={paper}>
                <div className={`${styles.Container} ContainerAnimation`}>
                                <div className={`${styles.TopBar}`}>
                                    <DiagramHeader/>
                                    <OptionsBar/>
                                    <AccountSetting setOpenRegisterDialog={setOpenRegisterDialog}/>
                                </div>
                                <div className={`${styles.ContentDiv}`}>
                                    <div className={`${styles.LeftSide}`}>
                                        {
                                            connectionMode
                                                ? <LinksContainer/>
                                                : <ElementsContainer/>
                                        }
                                    </div>

                                    <div className={`${styles.Middle}`}>
                                        <div className={`${styles.DragSentence}`}>Drop Sheet</div>
                                        <div className={`${styles.MiddlePaper}`}>
                                            <PaperView/>
                                        </div>
                                    </div>
                                    <div className={`${styles.RightSide}`}>
                                        <RightSideWrapper/>
                                    </div>
                                </div>
                            </div>
                            <NotificationBox/>
                            <ConfirmDialog/>
                            <RegisterDialog isOpen={openRegisterDialog} setIsOpenAction={setOpenRegisterDialog}/>
                            <LoadingDialog/>
                </PaperContext.Provider>
            </>
        );
})
HomePage.displayName = "HomePage";
export default HomePage