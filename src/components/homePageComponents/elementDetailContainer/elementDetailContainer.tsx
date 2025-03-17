'use client'
import styles from './elementDetailContainer.module.css'
import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {saveElementData} from "@/libs/saveElementData";
import {resizeElement} from "@/libs/resizeElement";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setElementSelected} from "@/libs/redux/features/elementSelectedSlice";
import ElementProperty from "@/components/homePageComponents/elementDetailContainer/elementProperty/elementProperty";
import ModalDialog from "@/components/infrastructure/modalDialog/modalDialog";
import {IElementProperty} from "../../../../declarations";
import ManagePropertiesDialog from "@/components/managePropertiesDialog/managePropertiesDialog";
import {setNotificationBox} from "@/libs/redux/features/notificationBoxSlice";
import {setIsLoading} from "@/libs/redux/features/loadingSlice";
import useHotkeys from "@reecelucas/react-use-hotkeys";

const ElementDetailContainer = () =>{

    const graph = useContext(GraphContext);
    const dispatch = useAppDispatch()
    const elementSelected = useAppSelector(state => state.elementSelected.value);
    let elementCellView = graph.getCell(elementSelected);

    const [elementMenuOpened, setElementMenuOpened] = useState(false);
    const [managePropertiesDialog, setManagePropertiesDialog] = useState(false);
    const [elementUpdated, setElementUpdated] = useState(false);


    const [formData, setFormData] = useState<{
        name: string;
        uri: string;
        height: number;
        width: number;
        scale: number;
        properties: IElementProperty[];
    }>({
        name: "",
        uri: "",
        height: 0,
        width: 0,
        scale: 1,
        properties:[]

    })

    useEffect(() => {
        if (elementCellView){
            setFormData({
                name: elementCellView.prop('customData/name') || '',
                uri: elementCellView.prop('customData/uri') || '',
                height: elementCellView.size().height || 0,
                width: elementCellView.size().width || 0,
                scale: 1,
                properties: elementCellView.prop('properties') || ''
            });
        }
    }, [elementCellView]);


    useEffect(() => {
        if (elementCellView){
            elementCellView.attr('label/display', elementCellView.prop('customData/showName') ? 'block' : 'none');
            elementCellView.attr('label2/display', elementCellView.prop('customData/showUri') ? 'block' : 'none');
        }
    }, [elementCellView, elementUpdated]);


    const handleShowName = () =>{
        elementCellView.prop('customData/showName', !elementCellView.prop('customData/showName'))
        setElementUpdated(!elementUpdated)
    }
    const handleShowUri = () => {
        elementCellView.prop('customData/showUri', !elementCellView.prop('customData/showUri'))

        setElementUpdated(!elementUpdated)
    }

    const handleSaveData = () =>{
        dispatch(setIsLoading(true))
        saveElementData(formData, elementCellView);
        resizeElement(formData, elementCellView, dispatch)


        //Deselect the previous element and reset the form
        const prevElement = graph.getCell(elementSelected);
        if (prevElement){
            prevElement.attr('path/stroke','black');
            prevElement.attr('body/stroke','black');
            prevElement.attr('top/stroke','black');

        }
        handleDiscardChanges()
        dispatch(setIsLoading(false))
        dispatch(setNotificationBox({message:`Your changes have been saved`}));

    }

    const handleDeleteElement = () =>{
        dispatch(setIsLoading(true))
        handleDiscardChanges();

        elementCellView.remove();
        dispatch(setIsLoading(false))
        dispatch(setNotificationBox({message: elementCellView.prop('customData/title')+ ` has been deleted`}));
    }

    const toggleMenu = () => {
        setElementMenuOpened(prevValue => !prevValue);
    }

    const handleDiscardChanges = () => {

        setElementMenuOpened(false);
        dispatch(setElementSelected(null))
        setFormData({
            name: "",
            uri: "",
            height: 0,
            width: 0,
            scale: 1,
            properties: []

        })
        dispatch(setNotificationBox({message:`All changes have been discarded`, isWarning: true}));
    }

    const handleManageProperties = () =>{
        setElementMenuOpened(false);
        setManagePropertiesDialog(true);
    }


    const handlePropertiesUpdate = (updatedProperties: IElementProperty[]) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            properties: updatedProperties
        }));
    };


    const handleResetElement = () => {
        dispatch(setIsLoading(true));
        setElementMenuOpened(false)
        elementCellView.prop('properties', [], { rewrite: true });
        setFormData({...formData, properties: []})
        setElementUpdated(!elementUpdated)
        dispatch(setIsLoading(false));

    }

    const handleDuplicateElements = () =>{
        dispatch(setIsLoading(true));
        setElementMenuOpened(false);
        const duplicatedElements = elementCellView.clone({deep: true});
        duplicatedElements.forEach((element: any) => {
            element.translate(100, 0);
        })
        graph.addCell(duplicatedElements);
        dispatch(setIsLoading(false));
    }

    useHotkeys("Enter", () => {
        console.log("Enter");
    });

    useHotkeys("Backspace", () => {
        console.log("Backspace");
    });

    return(
        <>
                {
                    elementCellView ?
                        (
                            <div className={`${styles.Container}`}>
                                <div className={`${styles.Top}`}>
                                    <div
                                        className={`${styles.LeftSide}`}>{elementCellView.prop('customData/title')}</div>
                                    <div className={`${styles.RightSide}`}>
                                        <button onClick={handleDeleteElement} className={`${styles.TopButtons}`}><Image
                                            src={'/assets/trash.webp'}
                                            alt={'trash'}
                                            width={25} height={25}/></button>

                                        <button onClick={toggleMenu} className={`${styles.TopButtons}`}><Image
                                            src={'/assets/menuBurger.webp'}
                                            alt={'menu'}
                                            width={25} height={25}/></button>
                                        {elementMenuOpened && (
                                            <div className={styles.MenuDiv}>
                                                <ModalDialog
                                                    title={'Element Settings'}
                                                    menuElement={[
                                                        {
                                                            title: "Manage Properties",
                                                            onClickEvent: handleManageProperties

                                                        },
                                                        {
                                                            title: "Save as Draft",

                                                        },
                                                        {
                                                            title: "Duplicate",
                                                            onClickEvent: handleDuplicateElements

                                                        },
                                                        {
                                                            title: "Reset",
                                                            onClickEvent: handleResetElement
                                                        },

                                                    ]} closeDialog={toggleMenu}/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={`${styles.PropertiesWrapper}`}>
                                    <label className={`${styles.Label}`}>Name</label>
                                    <div className={`${styles.UriDiv}`}>
                                        <input
                                            className={`${styles.Input}`}
                                               placeholder={`${elementCellView.prop('customData/name')}`}
                                               value={formData.name} // Set the value from formData
                                               onChange={e => {
                                                   setFormData(prevState => ({
                                                       ...prevState,
                                                       name: e.target.value
                                                   }))
                                               }}
                                            autoFocus
                                        />
                                        <button tabIndex={-1} className={`${styles.EyeButton}`}><Image onClick={handleShowName}
                                                                                         src={!elementCellView.prop('customData/showName') ? '/assets/eyeClosed.webp' : '/assets/eyeOpened.webp'}
                                                                                         alt={'trash'}
                                                                                         width={25} height={25}/>
                                        </button>
                                    </div>

                                    <label className={`${styles.Label}`}>Uri</label>
                                    <div className={`${styles.UriDiv}`}>
                                        <input className={`${styles.Input}`}
                                               placeholder={`${elementCellView.prop('customData/uri')}`}
                                               value={formData.uri}
                                               onChange={e => {
                                                   setFormData(prevState => ({
                                                       ...prevState,
                                                       uri: e.target.value
                                                   }))
                                               }}

                                        />
                                        <button tabIndex={-1} className={`${styles.EyeButton}`}><Image onClick={handleShowUri}
                                                                                         src={!elementCellView.prop('customData/showUri') ? '/assets/eyeClosed.webp' : '/assets/eyeOpened.webp'}
                                                                                         alt={'trash'}
                                                                                         width={25} height={25}/>
                                        </button>
                                    </div>


                                    {formData.properties.map((property, index) => (
                                        property.active &&
                                        <ElementProperty property={property} key={index} setFormData={setFormData}
                                                         formData={formData}/>
                                    ))}


                                </div>


                                <div className={`${styles.DimensionsDiv}`}>
                                    <div className={`${styles.InputView}`}>
                                        <p>W</p>
                                        <input type={'text'} className={`${styles.WidthInput}`}
                                               placeholder={elementCellView.size().width}

                                               onChange={e => {
                                                   const value = parseFloat(e.target.value);
                                                   setFormData(prevState => ({
                                                       ...prevState,
                                                       width: value
                                                   }))
                                               }}

                                        />
                                        <p>H</p>
                                        <input type={'text'} className={`${styles.WidthInput}`}
                                               placeholder={elementCellView.size().height}

                                               onChange={e => {

                                                   const value = parseFloat(e.target.value);
                                                   setFormData(prevState => ({
                                                       ...prevState,
                                                       height: value
                                                   }))
                                               }}
                                        />
                                    </div>
                                    <p>pixels</p>
                                </div>
                                <div className={`${styles.ScaleDiv}`}>
                                    <div className={`${styles.InputView}`}>
                                        <p>Scale</p>
                                        <input type={'text'} className={`${styles.WidthInput}`}
                                               placeholder={'x1'}
                                               onChange={e => {
                                                   const value = parseFloat(e.target.value);
                                                   setFormData(prevState => ({
                                                       ...prevState,
                                                       scale: value
                                                   }))

                                               }}

                                        />
                                    </div>
                                </div>
                                <div className={`${styles.PositionDiv}`}>
                                    <button tabIndex={-1} className={`${styles.PositionButton}`}><Image
                                        onClick={() => elementCellView.toFront()}
                                        src={'/assets/front.webp'}
                                        alt={'front'}
                                        width={21} height={30}/>
                                        <div className={`${styles.Indicator} ${styles.IndicatorActive} `}></div>

                                    </button>
                                    <button tabIndex={-1} className={`${styles.PositionButton}`}><Image
                                        src={'/assets/back.webp'}
                                        onClick={() => elementCellView.toBack()}
                                        alt={'back'}
                                        width={21} height={30}/>
                                        <div className={`${styles.Indicator}  ${styles.IndicatorActive} `}></div>
                                    </button>
                                </div>
                                <button onClick={handleSaveData}
                                        className={`${styles.SaveButton}`}>Save
                                </button>
                                <button onClick={handleDiscardChanges} style={{backgroundColor: "var(--danger-color)"}}
                                        className={`${styles.SaveButton}`}>Discard Changes
                                </button>
                            </div>
                        ) :
                        (
                            <div className={`${styles.Container} ${styles.EmptyContainer}`}>
                                No component selected
                            </div>
                        )

                }
            {
                    managePropertiesDialog && <ManagePropertiesDialog onPropertiesUpdated={handlePropertiesUpdate}
                                                                      elementCellView={elementCellView}
                                                                      close={() => setManagePropertiesDialog(false)}/>

                }

            </>
            );
            }
            export default ElementDetailContainer