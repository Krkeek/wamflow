'use client'
import styles from './shapeDetailContainer.module.css'
import Image from "next/image";
import {createContext, useContext, useEffect, useState} from "react";
import {retry} from "next/dist/compiled/@next/font/dist/google/retry";
import {ElementProps} from "../../../../declarations";
import {elementTools} from "@joint/core";
import {name} from "next/dist/telemetry/ci-info";
import {GraphContext} from "@/libs/joint/GraphContext";
import {initialize} from "next/client";

type propsType = {
    elementSelected : string | null,
    setElementSelected : (el: any) => void
}
const ShapeDetailContainer = (props: propsType) =>{
    const graph = useContext(GraphContext);
    const elementSelected = props.elementSelected;
    const elementCellView = graph.getCell(elementSelected);
    const [showUri, setShowUri] = useState(false);
    const [inFront, setInFront] = useState(true);


    const [formData, setFormData] = useState({
        name: "",
        uri: "",
        height: 0,
        width: 0
    })





    const handleSaveData = () =>{


        elementCellView.resize(formData.width,formData.height);
        props.setElementSelected(null)

    }

    const handleDeleteElement = () =>{
        elementCellView.remove();
        props.setElementSelected(null)
    }


    return(
        <>

            {
                elementCellView ?
                (
                    <div className={`${styles.Container}`}>
                        <div className={`${styles.Top}`}>
                            <div className={`${styles.LeftSide}`}>Security Realm</div>
                            <div className={`${styles.RightSide}`}>
                                <button onClick={handleDeleteElement} className={`${styles.TopButtons}`}><Image src={'/assets/trash.webp'}
                                                                                  alt={'trash'}
                                                                                  width={25} height={25}/></button>
                                <button onClick={handleSaveData} className={`${styles.TopButtons}`}><Image src={'/assets/tick.webp'}
                                                                                  alt={'trash'}
                                                                                  width={25} height={25}/></button>

                            </div>
                        </div>
                        <input className={`${styles.Input}`} placeholder={elementCellView.attributes.attrs.name}
                               // onChange={e => {
                               //     setFormData(prevState => ({...prevState,
                               //         name: e.target.value
                               //     }))
                               // }}
                        />
                        <div className={`${styles.UriDiv}`}>
                            <input className={`${styles.Input}`} placeholder={elementCellView.attributes.attrs.uri}
                                   // onChange={e => {
                                   //     setFormData(prevState => ({...prevState,
                                   //         uri: e.target.value
                                   //     }))
                                   // }}
                            />
                            <button className={`${styles.EyeButton}`}><Image onClick={() => setShowUri(!showUri)}
                                                                             src={!showUri ? '/assets/eyeClosed.webp' : '/assets/eyeOpened.webp'}
                                                                             alt={'trash'}
                                                                             width={25} height={25}/></button>
                        </div>
                        <div className={`${styles.DimensionsDiv}`}>
                            <div className={`${styles.InputView}`}>
                                <p>W</p>
                                <input type={'text'} className={`${styles.WidthInput}`} placeholder={elementCellView.size().width}

                                       onChange={e => {
                                           const value = parseFloat(e.target.value);
                                           setFormData(prevState => ({...prevState,
                                               width: value
                                           }))
                                       }}

                                />
                                <p>H</p>
                                <input type={'text'} className={`${styles.WidthInput}`} placeholder={elementCellView.size().height}

                                       onChange={e => {
                                           const value = parseFloat(e.target.value);
                                           setFormData(prevState => ({...prevState,
                                               height: value
                                           }))
                                       }}
                                />
                            </div>
                            <p>pixels</p>
                        </div>
                        <div className={`${styles.PositionDiv}`}>
                            <button className={`${styles.PositionButton}`}><Image
                                onClick={() => setInFront(true)}
                                src={'/assets/front.webp'}
                                alt={'front'}
                                width={21} height={30}/>
                                <div className={`${styles.Indicator} ${inFront ? styles.IndicatorActive : ' '} `}></div>

                            </button>
                            <button className={`${styles.PositionButton}`}><Image
                                src={'/assets/back.webp'}
                                onClick={() => setInFront(false)}
                                alt={'back'}
                                width={21} height={30}/>
                                <div
                                    className={`${styles.Indicator}  ${!inFront ? styles.IndicatorActive : ' '} `}></div>
                            </button>
                        </div>

                    </div>
                ):
                    (
                        <div className={`${styles.Container} ${styles.EmptyContainer}`}>
                            No component selected
                        </div>
                    )
            }

        </>
    );
}
export default ShapeDetailContainer