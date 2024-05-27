'use client'
import styles from './shapeDetailContainer.module.css'
import Image from "next/image";
import {useState} from "react";
import {retry} from "next/dist/compiled/@next/font/dist/google/retry";
import {ElementProps} from "../../../../declarations";

type propsType = {
    elementSelected : ElementProps
}
const ShapeDetailContainer = (props: propsType) =>{
    const [shapeSelected, setShapeSelected] = useState(true);
    const [showUri, setShowUri] = useState(false);
    const [inFront, setInFront] = useState(true);

    return(
        <>

            {
                shapeSelected ?
                (
                    <div className={`${styles.Container}`}>
                        <div className={`${styles.Top}`}>
                            <div className={`${styles.LeftSide}`}>Security Realm</div>
                            <div className={`${styles.RightSide}`}>
                                <button className={`${styles.TopButtons}`}><Image src={'/assets/trash.webp'}
                                                                                  alt={'trash'}
                                                                                  width={25} height={25}/></button>
                                <button className={`${styles.TopButtons}`}><Image src={'/assets/tick.webp'}
                                                                                  alt={'trash'}
                                                                                  width={25} height={25}/></button>

                            </div>
                        </div>
                        <input className={`${styles.Input}`} placeholder={'Name'} />
                        <div className={`${styles.UriDiv}`}>
                            <input className={`${styles.Input}`} placeholder={'Uri'} />
                            <button className={`${styles.EyeButton}`}><Image onClick={() => setShowUri(!showUri)}
                                                                             src={!showUri ? '/assets/eyeClosed.webp' : '/assets/eyeOpened.webp'}
                                                                             alt={'trash'}
                                                                             width={25} height={25}/></button>
                        </div>
                        <div className={`${styles.DimensionsDiv}`}>
                            <div className={`${styles.InputView}`}>
                                <p>W</p>
                                <input type={'text'} className={`${styles.WidthInput}`} />
                                <p>H</p>
                                <input type={'text'} className={`${styles.WidthInput}`} />
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