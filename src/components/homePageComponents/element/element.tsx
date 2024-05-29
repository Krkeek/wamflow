'use client'
import styles from './element.module.css'
import {ShapeInterface} from "../../../../declarations";
import Image from "next/image";
type propsType = {
    shape: ShapeInterface,
    handleCreateElement: (elementId: string) => void

}

const Element = (props: propsType) =>{

    return(
        <>
            <div className={`${styles.Container}`}>
                <Image onClick={() => props.handleCreateElement(props.shape.id)} className={`${styles.SVG}`} src={props.shape.SVGUrl} alt={'shape'} width={70} height={70}/>
                <p className={`${styles.Id}`}>{props.shape.name}</p>
                <div className={`${styles.Line}`}></div>
            </div>

        </>
    );
}
export default Element