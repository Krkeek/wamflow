import {dia} from "@joint/core";
import Paper = dia.Paper;
import {linkViewTools} from "@/libs/joint/linkTools/linkTools";
import Graph = dia.Graph;
import {setElementSelected} from "@/libs/redux/features/elementSelectedSlice";
import {setToggleContainer} from "@/libs/redux/features/mobileToggleContainerSlice";
import {setLinkSelected} from "@/libs/redux/features/linkSelectedSlice";


type PropsType = {
    paper: Paper,
    graph: Graph,
    connectionMode: boolean,
    dispatch: any,
    elementSelected: any,
    linkSelected: any,
    isMobileView: boolean,
    toggleContainer: boolean,

}

export const paperEventListener     = (props: PropsType) =>{

    const paper = props.paper
    const graph = props.graph;
    const connectionMode = props.connectionMode
    const elementSelected = props.elementSelected
    const linkSelected = props.linkSelected

    paper.on('element:pointerdown',(cellView)=>{
        if (elementSelected !== null){
            const prevElement = graph.getCell(elementSelected);
            if (prevElement){
                prevElement.attr('path/stroke','black');
                prevElement.attr('body/stroke','black');
                prevElement.attr('top/stroke','black');

            }
        }
        if (linkSelected !== null){
            const prevLink = graph.getCell(linkSelected);
            if (prevLink){
                prevLink.attr('line/stroke','black');
            }
            props.dispatch(setLinkSelected(null))
        }

        props.dispatch(setElementSelected(cellView.model.id))
        cellView.model.attr('path/stroke','#023E8A');
        cellView.model.attr('body/stroke','#023E8A');
        cellView.model.attr('top/stroke','#023E8A');

        if (props.toggleContainer && props.isMobileView)
            props.dispatch(setToggleContainer(false))
    })

    paper.on('link:pointerdown', function(linkView) {
        if (linkSelected !== null){
            const prevLink = graph.getCell(linkSelected);
            if (prevLink){
                prevLink.attr('line/stroke','black');
            }
            props.dispatch(setLinkSelected(null))
        }
        const prevElement = graph.getCell(elementSelected);
        if (prevElement){
            prevElement.attr('path/stroke','black');
            prevElement.attr('body/stroke','black');
            prevElement.attr('top/stroke','black');

        }
        props.dispatch(setElementSelected(null))
        props.dispatch(setLinkSelected(linkView.model.id))
        linkView.model.attr('line/stroke','#023E8A');


        if (props.toggleContainer && props.isMobileView)
            props.dispatch(setToggleContainer(false))
    });


    //When clicking on a blank place on the paper
    paper.on('blank:pointerclick',()=>{
        const prevElement = graph.getCell(elementSelected);
        if (prevElement){
            prevElement.attr('path/stroke','black');
            prevElement.attr('body/stroke','black');
            prevElement.attr('top/stroke','black');

        }
        props.dispatch(setElementSelected(null))

        if (linkSelected !== null){
            const prevLink = graph.getCell(linkSelected);
            if (prevLink){
                prevLink.attr('line/stroke','black');
            }
            props.dispatch(setLinkSelected(null))
        }

        if (props.toggleContainer && props.isMobileView)
            props.dispatch(setToggleContainer(false))
    })

    paper.on('link:mouseenter', function(linkView) {
        connectionMode &&
        linkView.addTools(linkViewTools());
    });

    paper.on('blank:mouseover', function() {
        paper.removeTools();
    });




}