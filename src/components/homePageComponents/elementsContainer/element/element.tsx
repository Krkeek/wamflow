import React, { memo } from 'react';
import styles from './element.module.css';
import { ShapeInterface } from "../../../../../declarations";
import Image from "next/image";

type propsType = {
    shape: ShapeInterface,
    handleDragStart: (event: any, elementId: string) => void,
}

const Element = memo((props: propsType) => {
    return (
        <>
            <div className={`${styles.Container}`}>
                <Image
                    draggable
                    onDragStart={(e) => props.handleDragStart(e, props.shape.id)}
                    className={`${styles.SVG}`}
                    src={props.shape.SVGUrl}
                    alt={'shape'}
                    width={70}
                    height={70}
                    priority
                />
                <p className={`${styles.Id}`}>{props.shape.name}</p>
                <div className={`${styles.Line}`}></div>
            </div>
        </>
    );
});

export default Element;