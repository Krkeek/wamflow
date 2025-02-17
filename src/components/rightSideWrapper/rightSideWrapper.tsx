import styles from './rightSideWrapper.module.css'
import {useState} from "react";
import PaperSettings from "@/components/homePageComponents/paperSettings/paperSettings";
import ElementDetailContainer from "@/components/homePageComponents/elementDetailContainer/elementDetailContainer";
import {dia} from "@joint/core";
import Paper = dia.Paper;

type IProps =
{
    paper: Paper | null

}
const RightSideWrapper = (props: IProps) => {
    const [controlCenterActive, setControlCenterActive] = useState<boolean>(false)



    return(
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.Controllers}`}>
                    <button  onClick={() => setControlCenterActive(false)} className={`${styles.ControllerButton} ${!controlCenterActive ? styles.ControllerButtonFocused : ' '}`}>Element</button>
                    <button onClick={() => setControlCenterActive(true)} className={`${styles.ControllerButton} ${controlCenterActive ? styles.ControllerButtonFocused : ' '}`} >Sheet</button>
                </div>
                <div className={`${styles.Content}`}>
                    {
                        controlCenterActive ?
                            (
                                <PaperSettings paper={props.paper} />
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