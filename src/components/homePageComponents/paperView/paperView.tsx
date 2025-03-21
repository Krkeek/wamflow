'use client'
import styles from './paperView.module.css'
import React, { useContext, useEffect, useRef, useCallback } from "react";
import { createJointElement } from "@/libs/joint/createJointElement";
import { GraphContext } from "@/libs/joint/GraphContext";
import { setElementSelected } from "@/libs/redux/features/elementSelectedSlice";
import { PaperContext } from "@/libs/joint/PaperContext";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";

const PaperView = () => {
    const dispatch = useAppDispatch();
    const graph = useContext(GraphContext);
    const paper = useContext(PaperContext);
    const canvas = useRef<HTMLDivElement>(null);
    const elementSelected = useAppSelector(state => state.elementSelected.value);

    const handleDrop = useCallback((e: React.DragEvent) => {
        if (!paper) return;
        e.preventDefault();
        const elementId = e.dataTransfer.getData("elementId");
        const mousePosition = paper?.clientToLocalPoint(e.clientX, e.clientY);

        const element = createJointElement(elementId, graph, mousePosition.x, mousePosition.y);

        // Auto select the dropped element
        if (elementSelected !== null) {
            const prevElement = graph.getCell(elementSelected);
            if (prevElement) {
                prevElement.attr('path/stroke', 'black');
                prevElement.attr('body/stroke', 'black');
                prevElement.attr('top/stroke', 'black');
            }
        }

        dispatch(setElementSelected(null));
        dispatch(setElementSelected(element.id));

        if (elementSelected !== element.id) {
            element.attr('path/stroke', '#023E8A');
            element.attr('body/stroke', '#023E8A');
            element.attr('top/stroke', '#023E8A');
        }
    }, [dispatch, elementSelected, graph, paper]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
    }, []);

    useEffect(() => {
        if (paper) {
            canvas.current?.appendChild(paper.el);
        }
    }, [paper]);

    return (
        <div
            ref={canvas}
            className={`${styles.Container}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        />
    );
}

export default PaperView;