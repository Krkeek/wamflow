'use client'
import {useState} from "react";
import { useAppSelector } from "@/libs/redux/hooks";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import DiagramHeader from "@/components/homePageComponents/diagramHeader/diagramHeader";
import OptionsBar from "@/components/homePageComponents/optionsBar/optionsBar";
import ElementsContainer from "@/components/homePageComponents/elementsContainer/elementsContainer";
import PaperView from "@/components/homePageComponents/paperView/paperView";
import LinksContainer from "@/components/homePageComponents/linksContainer/linksContainer";
import NotificationBox from "@/components/infrastructure/notificationBox/notificationBox";
import { HomePageAnimation } from "@/libs/gsap/HomePageAnimation";
import styles from './homePage.module.css';
import AccountSetting from "@/components/homePageComponents/accountSetting/accountSetting";
import ConfirmDialog from "@/components/infrastructure/confirmDialog/confirmDialog";
import RegisterDialog from "@/components/registerDialog/registerDialog";
import LoadingDialog from "@/components/infrastructure/loadingDialog/loadingDialog";
import RightSideWrapper from "@/components/rightSideWrapper/rightSideWrapper";
import usePreventBackButton from "@/utils/hooks/usePreventBackButton";
import useFetchUserStatus from "@/utils/hooks/useFetchUserStatus";
import useAttachEventListeners from "@/utils/hooks/useAttachEventListeners";


const HomePage = () =>{

    const connectionMode = useAppSelector(state => state.connectionMode.value)
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

    usePreventBackButton();
    useFetchUserStatus();
    useAttachEventListeners();

    useGSAP(()=>{
        const ctx = gsap.context(()=>{
            HomePageAnimation()
        })
        return () => ctx.revert()
    })


    return(
        <>
            <div className={`${styles.Container} ContainerAnimation`}>
                <div className={`${styles.TopBar}` }>
                  <DiagramHeader />
                  <OptionsBar />
                  <AccountSetting setOpenRegisterDialog={setOpenRegisterDialog} />
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
                        <div className={`${styles.DragSentence}`}>Drop Sheet</div>
                        <div  className={`${styles.MiddlePaper}`} >
                            <PaperView />
                        </div>
                    </div>
                    <div className={`${styles.RightSide}`}>
                        <RightSideWrapper  />
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