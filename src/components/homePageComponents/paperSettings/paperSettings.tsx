import styles from "./paperSettings.module.css";
import ControlButton from "@/components/homePageComponents/paperSettings/controlButton/controlButton";
import { dia } from "@joint/core";
import {useContext, useEffect, useState} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import Graph = dia.Graph;

type IProps = {
    paper: dia.Paper | null;
};

const PaperSettings = ({ paper }: IProps) => {
    const [scale, setScale] = useState({ sx: 1, sy: 1 });
    const [position, setPosition] = useState({ tx: 0, ty: 0 });
    const graph: Graph = useContext(GraphContext);

    useEffect(() => {
        if (paper) {
            setScale(paper.scale());
            setPosition(paper.translate());
        }
    }, [paper]);

    const handleZoom = (zoomIn: boolean) => {
        if (!paper) return;
        const factor = zoomIn ? 0.1 : -0.1;
        const newScale = { sx: scale.sx + factor, sy: scale.sy + factor };
        paper.scale(newScale.sx, newScale.sy);
        setScale(newScale);
    };

    const handleTranslate = (dx: number, dy: number) => {
        if (!paper) return;
        const newPosition = { tx: position.tx + dx, ty: position.ty + dy };
        paper.translate(newPosition.tx, newPosition.ty);
        setPosition(newPosition);
    };

    const handleToggleElementNames = () => {
        const elements = graph.getElements();
        for (const element of elements) {
            element.prop('customData/showName', !element.prop('customData/showName'))
            element.attr('label/display', element.prop('customData/showName') ? 'block' : 'none');
        }
    }
    const handleToggleElementUri = () => {
        const elements = graph.getElements();
        for (const element of elements) {
            element.prop('customData/showUri', !element.prop('customData/showUri'))
            element.attr('label2/display', element.prop('customData/showUri') ? 'block' : 'none');
        }
    }

    const handleToggleLinkLabels = () => {
        const links = graph.getLinks();
        for (const link of links) {
            const showLabel = !link.prop('customData/showLabel');
            link.prop('customData/showLabel', showLabel);
            link.label(0, {
                attrs: {
                    text: {
                        display: showLabel ? 'block' : 'none'
                    }
                }
            });
        }
    };

    const handleClearPaper = () => {
        graph.clear();
    }
    const handleRemoveLinks = () => {
        const cells = graph.getElements();
        for (const cell of cells) {
            graph.removeLinks(cell);
        }
    }

    const handleRelocateElements = () => {
        if (!paper) return;
        paper.translate(0,0);
    }


    return (
        <div className={styles.Container}>
            <div className={styles.Header}>Control Center</div>
            <div className={styles.Expandable}>

                <div className={styles.Column}>
                    Translate
                    <ControlButton onClick={() => handleTranslate(-70, 0)} transform="rotate(-90deg)"
                                   margin="0 0 0 1rem" imgUrl="/assets/arrow.png"/>
                    <ControlButton onClick={() => handleTranslate(0, -70)} imgUrl="/assets/arrow.png"/>
                    <ControlButton onClick={() => handleTranslate(0, 70)} transform="rotate(180deg)"
                                   imgUrl="/assets/arrow.png"/>
                    <ControlButton onClick={() => handleTranslate(70, 0)} transform="rotate(90deg)"
                                   imgUrl="/assets/arrow.png"/>
                </div>

                <div className={styles.Column}>
                    Scale
                    <ControlButton onClick={() => handleZoom(true)} margin="0 0 0 1rem" value="+"/>
                    <ControlButton onClick={() => handleZoom(false)} alignItems="flex-start" value="_"/>
                </div>
                <div className={styles.Column}>
                    Toggle
                    <ControlButton onClick={handleToggleElementNames} margin="0 0 0 1rem" value={'Names'}
                                   width={'fit-content'} fontWeight={'400'} padding={'0 0.6rem'} fontSize={'0.9rem'}
                                   minWidth={'2.5rem'}/>
                    <ControlButton onClick={handleToggleElementUri} value={'URIs'} width={'fit-content'}
                                   fontWeight={'400'} padding={'0 0.6rem'} fontSize={'0.9rem'} minWidth={'2.5em'}/>
                    <ControlButton onClick={handleToggleLinkLabels} value={'Labels'} width={'fit-content'}
                                   fontWeight={'400'} padding={'0 0.6rem'} fontSize={'0.9rem'} minWidth={'2.5rem'}/>

                </div>
                <div className={styles.Column}>
                    Paper
                    <ControlButton onClick={handleRelocateElements} margin="0 0 0 1rem" value={'Fit To Content'}
                                   width={'fit-content'} fontWeight={'400'} padding={'0 0.6rem'} fontSize={'0.9rem'}
                                   minWidth={'2.5rem'}/>
                    <ControlButton onClick={handleClearPaper} value={'Clear All'}
                                   width={'fit-content'} fontWeight={'400'} padding={'0 0.6rem'} fontSize={'0.9rem'}
                                   minWidth={'2.5rem'}/>
                </div>
                <div className={styles.Column}>
                    Links
                    <ControlButton onClick={handleRemoveLinks} margin="0 0 0 1rem" value={'Remove All'}
                                   width={'fit-content'} fontWeight={'400'} padding={'0 0.6rem'} fontSize={'0.9rem'}
                                   minWidth={'2.5rem'}/>

                </div>
            </div>
        </div>
    );
};

export default PaperSettings;