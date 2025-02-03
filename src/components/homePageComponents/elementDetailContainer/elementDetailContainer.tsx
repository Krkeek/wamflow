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


const ElementDetailContainer = () =>{

    const graph = useContext(GraphContext);
    const dispatch = useAppDispatch()
    const elementSelected = useAppSelector(state => state.elementSelected.value);
    const elementCellView = graph.getCell(elementSelected);

    const [elementMenuOpened, setElementMenuOpened] = useState(false);

    const [elementUpdated, setElementUpdated] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        uri: "",
        height: 0,
        width: 0,
        scale: 1,

    })

    useEffect(() => {
        if (elementCellView){
            setFormData({
                name: elementCellView.prop('customData/name') || '',
                uri: elementCellView.prop('customData/uri') || '',
                height: elementCellView.size().height || 0,
                width: elementCellView.size().width || 0,
                scale: 1,
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

        saveElementData(formData, elementCellView);
        resizeElement(formData, elementCellView, dispatch)


        //Deselect the previous element and reset the form
        const prevElement = graph.getCell(elementSelected);
        if (prevElement){
            prevElement.attr('path/stroke','black');
            prevElement.attr('body/stroke','black');
            prevElement.attr('top/stroke','black');

        }
        dispatch(setElementSelected(null))
        setFormData({
            name: "",
            uri: "",
            height: 0,
            width: 0,
            scale: 1,

        })

    }


    const handleDeleteElement = () =>{
        elementCellView.remove();
        dispatch(setElementSelected(null))
        setFormData({
            name: "",
            uri: "",
            height: 0,
            width: 0,
            scale: 1,
        })
    }

    const handleMenuExpand = () => {
        setElementMenuOpened(!elementMenuOpened);

    }

    return(
        <>

            {
                elementCellView ?
                (
                    <div className={`${styles.Container}`}>
                        <div className={`${styles.Top}`}>
                            <div className={`${styles.LeftSide}`}>{elementCellView.prop('customData/title')}</div>
                            <div className={`${styles.RightSide}`}>
                                    <button onClick={handleDeleteElement} className={`${styles.TopButtons}`}><Image
                                        src={'/assets/trash.webp'}
                                        alt={'trash'}
                                        width={25} height={25}/></button>

                                    <button onClick={handleMenuExpand} className={`${styles.TopButtons}`}><Image
                                        src={'/assets/menuBurger.webp'}
                                        alt={'menu'}
                                        width={25} height={25}/></button>

                                    {elementMenuOpened && (
                                        <div className={styles.MenuDiv}>
                                            <ModalDialog />
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className={`${styles.PropertiesWrapper}`}>
                            <label className={`${styles.Label}`}>Name</label>
                            <div className={`${styles.UriDiv}`}>
                                <input className={`${styles.Input}`}
                                       placeholder={`${elementCellView.prop('customData/name')}`}
                                       value={formData.name} // Set the value from formData
                                       onChange={e => {
                                           setFormData(prevState => ({
                                               ...prevState,
                                               name: e.target.value
                                           }))
                                       }}
                                />
                                <button className={`${styles.EyeButton}`}><Image onClick={handleShowName}
                                                                                 src={!elementCellView.prop('customData/showName') ? '/assets/eyeClosed.webp' : '/assets/eyeOpened.webp'}
                                                                                 alt={'trash'}
                                                                                 width={25} height={25}/></button>
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
                                <button className={`${styles.EyeButton}`}><Image onClick={handleShowUri}
                                                                                 src={!elementCellView.prop('customData/showUri') ? '/assets/eyeClosed.webp' : '/assets/eyeOpened.webp'}
                                                                                 alt={'trash'}
                                                                                 width={25} height={25}/></button>
                            </div>


                            <ElementProperty elementCellView={elementCellView} elementUpdated={elementUpdated}
                                             setElementUpdated={setElementUpdated} setFormData={setFormData}
                                             formData={formData}/>

                            <ElementProperty elementCellView={elementCellView} elementUpdated={elementUpdated}
                                             setElementUpdated={setElementUpdated} setFormData={setFormData}
                                             formData={formData}/>

                            <ElementProperty elementCellView={elementCellView} elementUpdated={elementUpdated}
                                             setElementUpdated={setElementUpdated} setFormData={setFormData}
                                             formData={formData}/>

                            <ElementProperty elementCellView={elementCellView} elementUpdated={elementUpdated}
                                             setElementUpdated={setElementUpdated} setFormData={setFormData}
                                             formData={formData}/>

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
                            <button className={`${styles.PositionButton}`}><Image
                                onClick={() => elementCellView.toFront()}
                                src={'/assets/front.webp'}
                                alt={'front'}
                                width={21} height={30}/>
                                <div className={`${styles.Indicator} ${styles.IndicatorActive} `}></div>

                            </button>
                            <button className={`${styles.PositionButton}`}><Image
                                src={'/assets/back.webp'}
                                onClick={() => elementCellView.toBack()}
                                alt={'back'}
                                width={21} height={30}/>
                                <div className={`${styles.Indicator}  ${styles.IndicatorActive} `}></div>
                            </button>
                        </div>
                        <button onClick={handleSaveData}
                                className={`${styles.SaveButton}`}>Save Changes
                        </button>
                        <button style={{backgroundColor: "#d9534f"}}
                                className={`${styles.SaveButton}`}>Discard
                        </button>

                    </div>
                ) :
                    (
                        <div className={`${styles.Container} ${styles.EmptyContainer}`}>
                        No component selected
                        </div>
                    )
            }

        </>
    );
}
export default ElementDetailContainer