import React, { memo } from 'react';
import styles from './element.module.css';
import { ShapeInterface } from "../../../../../declarations";
import Image from "next/image";
import SVG from 'react-inlinesvg';
type propsType = {
    shape: ShapeInterface,
    handleDragStart: (event: any, elementId: string) => void,
}

const Element = memo((props: propsType) => {
    return (
        <>
            <div className={`${styles.Container}`}>

                {
                    props.shape.SVGUrl != null ? (
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
                    ) : (
                        <div
                        draggable
                        className={`${styles.SVG}`}
                        onDragStart={(e) => props.handleDragStart(e, props.shape.id)}
                        >
                            <SVG
                                width={70}
                                height="auto"
                                src={props.shape.code}/>
                        </div>
                    )
                }
                <p className={`${styles.Id}`}>{props.shape.name}</p>
                <div className={`${styles.Line}`}></div>
            </div>
        </>
    );
});

Element.displayName = 'Element';
export default Element;