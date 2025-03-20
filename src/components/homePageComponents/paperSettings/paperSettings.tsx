import styles from "./paperSettings.module.css";
import ControlButton from "@/components/homePageComponents/paperSettings/controlButton/controlButton";
import { dia } from "@joint/core";
import {useContext, useEffect, useState} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import Graph = dia.Graph;
import {PaperContext} from "@/libs/joint/PaperContext";



const PaperSettings = () => {
    const [scale, setScale] = useState({ sx: 1, sy: 1 });
    const graph: Graph = useContext(GraphContext);
    const paper = useContext(PaperContext)

    useEffect(() => {
        if (paper) {
            setScale(paper.scale());
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

        const graph = paper.model;
        const elements = graph.getElements();
        const links = graph.getLinks();

        const bbox = graph.getBBox();

        const paperWidth = paper.getComputedSize().width;
        const paperHeight = paper.getComputedSize().height;

        if (bbox){
            const newX = bbox.x + dx;
            const newY = bbox.y + dy;
            const newRight = bbox.x + bbox.width + dx;
            const newBottom = bbox.y + bbox.height + dy;

            if (newX < 0 || newY < 0 || newRight > paperWidth || newBottom > paperHeight) {
                return;
            }

            elements.forEach((element: any) => {
                const position = element.position();
                element.position(position.x + dx, position.y + dy);
            });

            links.forEach((link: any) => {
                const vertices = link.vertices();
                link.vertices(vertices.map((v: any) => ({ x: v.x + dx, y: v.y + dy })));
            });
        }
    };

    const moveAllElementsToOrigin = () => {
        if (!paper) return;

        const graph = paper.model;
        const elements = graph.getElements();

        const bbox = elements.reduce(
            (bbox: any, element: any) => {
                const elementBbox = element.getBBox();
                bbox.x = Math.min(bbox.x, elementBbox.x);
                bbox.y = Math.min(bbox.y, elementBbox.y);
                bbox.width = Math.max(bbox.x + bbox.width, elementBbox.x + elementBbox.width) - bbox.x;
                bbox.height = Math.max(bbox.y + bbox.height, elementBbox.y + elementBbox.height) - bbox.y;
                return bbox;
            },
            { x: Infinity, y: Infinity, width: 0, height: 0 }
        );

        const offsetX = bbox.x - 20;
        const offsetY = bbox.y - 20;

        elements.forEach((element: any) => {
            const position = element.position();
            element.position(position.x - offsetX, position.y - offsetY);
        });
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
                    <ControlButton onClick={moveAllElementsToOrigin} value={'Origin'} width={'fit-content'}
                                   fontWeight={'400'} padding={'0 0.6rem'} fontSize={'0.9rem'} minWidth={'2.5rem'}/>
                </div>
                <div className={styles.Column}>
                    Zoom
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
                    <ControlButton onClick={handleClearPaper} margin="0 0 0 1rem" value={'Clear All'}
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