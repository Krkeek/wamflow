import { setLinkSelected } from "@/libs/redux/features/linkSelectedSlice";
import { setElementSelected } from "@/libs/redux/features/elementSelectedSlice";
import { linkViewTools } from "@/libs/joint/linkTools/linkTools";
import { useContext, useEffect } from "react";
import { GraphContext } from "@/libs/joint/GraphContext";
import { PaperContext } from "@/libs/joint/PaperContext";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";

const useAttachEventListeners = () => {
    const dispatch = useAppDispatch();
    const graph = useContext(GraphContext);
    const paper = useContext(PaperContext);
    const connectionMode = useAppSelector(state => state.connectionMode.value);
    const elementSelected = useAppSelector(state => state.elementSelected.value);
    const linkSelected = useAppSelector(state => state.linkSelected.value);

    useEffect(() => {
        const onElementPointerDown = (cellView: any) => {
            if (elementSelected !== null) {
                const prevElement = graph.getCell(elementSelected);
                if (prevElement) {
                    prevElement.attr('path/stroke', 'black');
                    prevElement.attr('body/stroke', 'black');
                    prevElement.attr('top/stroke', 'black');
                }
            }
            if (linkSelected !== null) {
                const prevLink = graph.getCell(linkSelected);
                if (prevLink) {
                    prevLink.attr('line/stroke', 'black');
                }
                dispatch(setLinkSelected(null));
            }

            dispatch(setElementSelected(cellView.model.id));
            cellView.model.attr('path/stroke', '#023E8A');
            cellView.model.attr('body/stroke', '#023E8A');
            cellView.model.attr('top/stroke', '#023E8A');
        };

        const onLinkPointerDown = (linkView: any) => {
            if (linkSelected !== null) {
                const prevLink = graph.getCell(linkSelected);
                if (prevLink) {
                    prevLink.attr('line/stroke', 'black');
                }
                dispatch(setLinkSelected(null));
            }

            const prevElement = graph.getCell(elementSelected);
            if (prevElement) {
                prevElement.attr('path/stroke', 'black');
                prevElement.attr('body/stroke', 'black');
                prevElement.attr('top/stroke', 'black');
            }
            dispatch(setElementSelected(null));
            dispatch(setLinkSelected(linkView.model.id));
            linkView.model.attr('line/stroke', '#023E8A');
        };

        const onLinkPointerUp = (linkView: any) => {
            const linkModel = linkView.model;
            const sourceCell = linkModel.getSourceElement();
            const targetCell = linkModel.getTargetElement();

            // If the link is not connected to any element (both source and target are null)
            if (!sourceCell || !targetCell) {
                dispatch(setLinkSelected(null));
            }
        };

        const onBlankPointerClick = () => {
            const prevElement = graph.getCell(elementSelected);
            console.log(elementSelected);

            if (prevElement) {
                prevElement.attr('path/stroke', 'black');
                prevElement.attr('body/stroke', 'black');
                prevElement.attr('top/stroke', 'black');
            }
            dispatch(setElementSelected(null));

            if (linkSelected !== null) {
                const prevLink = graph.getCell(linkSelected);
                if (prevLink) {
                    prevLink.attr('line/stroke', 'black');
                }
                dispatch(setLinkSelected(null));
            }
        };

        const onLinkMouseEnter = (linkView: any) => {
            connectionMode && linkView.addTools(linkViewTools());
        };

        const onBlankMouseOver = () => {
            paper.removeTools();
        };

        paper.on('element:pointerdown', onElementPointerDown);
        paper.on('link:pointerdown', onLinkPointerDown);
        paper.on('link:pointerup', onLinkPointerUp);
        paper.on('blank:pointerclick', onBlankPointerClick);
        paper.on('link:mouseenter', onLinkMouseEnter);
        paper.on('blank:mouseover', onBlankMouseOver);

        return () => {
            paper.off('element:pointerdown', onElementPointerDown);
            paper.off('link:pointerdown', onLinkPointerDown);
            paper.off('link:pointerup', onLinkPointerUp);
            paper.off('blank:pointerclick', onBlankPointerClick);
            paper.off('link:mouseenter', onLinkMouseEnter);
            paper.off('blank:mouseover', onBlankMouseOver);
        };
    }, [dispatch, elementSelected, linkSelected, connectionMode, graph, paper]);
};

export default useAttachEventListeners;