import styles from './linkDetailContainer.module.css'
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {useContext, useEffect, useRef, useState} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import Image from "next/image";
import {setNotificationBox} from "@/libs/redux/features/notificationBoxSlice";
import {setLinkSelected} from "@/libs/redux/features/linkSelectedSlice";
import {setIsLoading} from "@/libs/redux/features/loadingSlice";
import useHotkeys from "@reecelucas/react-use-hotkeys";
const LinkDetailContainer = () => {

    const dispatch = useAppDispatch()
    const graph = useContext(GraphContext);
    const linkSelected = useAppSelector(state => state.linkSelected.value);
    let linkCellView = graph.getCell(linkSelected);
    const lastSaveTime = useRef<number>(0);
    const [linkUpdated, setLinkUpdated] = useState(false);

    const [initialFormData, setInitialFormData] = useState<{
        label: string;
    }>({
        label: "",
    });

    const [formData, setFormData] = useState<{
        label: string;
    }>({
        label: "",
    })

    useEffect(() => {
        if (linkCellView) {
            const updatedFormData = {
                label: linkCellView.prop("customData/label") || "",
            };

            setFormData(updatedFormData);
            setInitialFormData(updatedFormData);
        }
    }, [linkCellView]);


    const handleSaveData = () => {
        const now = Date.now();

        if (now - lastSaveTime.current < 2000) {
            console.log("You need to wait 2 seconds before saving again.");
            return;
        }

        lastSaveTime.current = now;

        dispatch(setIsLoading(true));

        const isFormUnchanged = JSON.stringify(formData) === JSON.stringify(initialFormData);
        if (isFormUnchanged) {
            dispatch(setNotificationBox({ message: `No new changes to save` }));
            dispatch(setIsLoading(false));
            return;
        }

        if (formData.label !== ""){
            linkCellView.prop('customData/label',formData.label)
        }
        const prevElement = graph.getCell(linkSelected);
        if (prevElement) {
            prevElement.attr('path/stroke', 'black');
            prevElement.attr('body/stroke', 'black');
            prevElement.attr('top/stroke', 'black');
        }
        handleDiscardChanges(true);
        dispatch(setIsLoading(false));
        dispatch(setNotificationBox({ message: `Your changes have been saved` }));
    }

    const handleDeleteElement = () => {
        dispatch(setIsLoading(true))
        handleDiscardChanges(true);

        linkCellView.remove();
        dispatch(setIsLoading(false))
        dispatch(setNotificationBox({message: linkCellView.prop('customData/title')+ ` Link has been deleted`}));
    }

    const handleDiscardChanges = (afterAction: boolean) => {

        if (linkSelected !== null){
            const prevLink = graph.getCell(linkSelected);
            if (prevLink){
                prevLink.attr('line/stroke','black');
            }
            dispatch(setLinkSelected(null))
        }
        setFormData({
            label: "",
        })

        if (!afterAction) {
            const isFormUnchanged = JSON.stringify(formData) === JSON.stringify(initialFormData);
            if (!isFormUnchanged){
                dispatch(setNotificationBox({message:`All changes have been discarded`, isWarning: true}));
            }
        }
    }


    const handleShowLabel = () =>{
        linkCellView.prop('customData/showLabel', !linkCellView.prop('customData/showLabel'))
        linkCellView.updateLabel();
        setLinkUpdated(!linkUpdated);
    }

    useHotkeys("Enter",() => {
            if (linkCellView) {
                handleSaveData();
            }
        },
        {
            ignoredElementWhitelist: ['INPUT'],
        }
    );

    useHotkeys("Backspace", () => {
        if (linkCellView) {
            handleDeleteElement()
        }
    });

    return (
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.Top}`}>
                    <div
                        className={`${styles.LeftSide}`}>{linkCellView.prop('customData/title')}</div>
                    <div className={`${styles.RightSide}`}>
                        <button onClick={handleDeleteElement} className={`${styles.TopButtons}`}><Image
                            src={'/assets/trash.webp'}
                            alt={'trash'}
                            width={25} height={25}/></button>
                    </div>
                </div>
                <div className={`${styles.PropertiesWrapper}`}>
                    <label className={`${styles.Label}`}>Label</label>
                    <div className={`${styles.UriDiv}`}>
                        <input
                            className={`${styles.Input} move`}
                            placeholder={`${linkCellView.prop('customData/label')}`}
                            value={formData.label} // Set the value from formData
                            onChange={e => {
                                setFormData(prevState => ({
                                    ...prevState,
                                    label: e.target.value
                                }))
                            }}
                        />
                        <button tabIndex={-1} className={`${styles.EyeButton}`}><Image onClick={handleShowLabel}
                                                                                       src={!linkCellView.prop('customData/showLabel') ? '/assets/eyeClosed.webp' : '/assets/eyeOpened.webp'}
                                                                                       alt={'trash'}
                                                                                       width={25} height={25}/>
                        </button>
                    </div>
                </div>


                <button onClick={handleSaveData}
                        className={`${styles.SaveButton}`}>Save
                </button>
                <button onClick={() => handleDiscardChanges(false)} style={{backgroundColor: "var(--danger-color)"}}
                        className={`${styles.SaveButton}`}>Discard Changes
                </button>
            </div>
        </>
    )
}
export default LinkDetailContainer