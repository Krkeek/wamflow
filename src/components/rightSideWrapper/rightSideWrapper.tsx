import styles from './rightSideWrapper.module.css'
import {useState} from "react";
import PaperSettings from "@/components/homePageComponents/paperSettings/paperSettings";
import ElementDetailContainer from "@/components/homePageComponents/elementDetailContainer/elementDetailContainer";
const RightSideWrapper = () => {
    const [controlCenterActive, setControlCenterActive] = useState<boolean>(false)



    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.Controllers}`}>
                    <button  onClick={() => setControlCenterActive(false)} className={`${styles.ControllerButton} ${!controlCenterActive ? styles.ControllerButtonFocused : ' '}`}>Element</button>
                    <button onClick={() => setControlCenterActive(true)} className={`${styles.ControllerButton} ${controlCenterActive ? styles.ControllerButtonFocused : ' '}`} >Graph</button>
                </div>
                <div className={`${styles.Content}`}>
                    {
                        controlCenterActive ?
                            (
                                <PaperSettings />
                            )
                            :
                            (
                                <ElementDetailContainer />
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default RightSideWrapper;