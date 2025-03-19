import styles from './rightSideWrapper.module.css'
import { useEffect, useState } from "react";
import PaperSettings from "@/components/homePageComponents/paperSettings/paperSettings";
import ElementDetailContainer from "@/components/homePageComponents/elementDetailContainer/elementDetailContainer";
import { dia } from "@joint/core";
import Paper = dia.Paper;
import { useAppSelector } from "@/libs/redux/hooks";
import LinkDetailContainer from "@/components/homePageComponents/linkDetailContainer/linkDetailContainer";

type IProps = {
    paper: Paper | null;
};

const RightSideWrapper = (props: IProps) => {
    const [controlCenterActive, setControlCenterActive] = useState<boolean>(false);
    const linkSelected = useAppSelector(state => state.linkSelected.value);
    const elementSelected = useAppSelector(state => state.elementSelected.value);

    return (
        <div className={`${styles.Container}`}>
            <div className={`${styles.Controllers}`}>
                <button
                    onClick={() => setControlCenterActive(false)}
                    className={`${styles.ControllerButton} ${!controlCenterActive ? styles.ControllerButtonFocused : ''}`}
                >
                    {
                        !elementSelected && linkSelected ? 'Link' : 'Element'
                    }
                </button>
                <button
                    onClick={() => setControlCenterActive(true)}
                    className={`${styles.ControllerButton} ${controlCenterActive ? styles.ControllerButtonFocused : ''}`}
                >
                    Sheet
                </button>
            </div>
            <div className={`${styles.Content}`}>
                {
                    controlCenterActive ? (
                        <PaperSettings paper={props.paper} />
                    ) : (
                        elementSelected && !linkSelected ? (
                            <ElementDetailContainer />
                        ) : (
                            !elementSelected && linkSelected ? (
                                <LinkDetailContainer />
                            ) : (
                                !elementSelected && !linkSelected && (
                                    <div className={`${styles.ContainerTwo} ${styles.EmptyContainer}`}>
                                        No component selected
                                    </div>
                                )
                            )
                        )
                    )
                }
            </div>
        </div>
    );
};

export default RightSideWrapper;