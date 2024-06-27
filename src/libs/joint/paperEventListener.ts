import {dia} from "@joint/core";
import Paper = dia.Paper;
import {linkViewTools} from "@/libs/joint/linkTools/linkTools";
import Graph = dia.Graph;
import {setElementSelected} from "@/libs/redux/features/elementSelectedSlice";
import {setToggleContainer} from "@/libs/redux/features/mobileToggleContainerSlice";


type PropsType = {
    paper: Paper,
    graph: Graph,
    connectionMode: boolean,
    dispatch: any,
    elementSelected: any,
    isMobileView: boolean,
    toggleContainer: boolean,

}

export const paperEventListener     = (props: PropsType) =>{

    const paper = props.paper
    const graph = props.graph;
    const connectionMode = props.connectionMode
    const elementSelected = props.elementSelected


    paper.on('element:pointerclick',(cellView)=>{
        if (elementSelected !== null){
            const prevElement = graph.getCell(elementSelected);
            if (prevElement){
                prevElement.attr('path/stroke','black');
                prevElement.attr('body/stroke','black');
                prevElement.attr('top/stroke','black');

            }
        }
        props.dispatch(setElementSelected(cellView.model.id))
        cellView.model.attr('path/stroke','#023E8A');
        cellView.model.attr('body/stroke','#023E8A');
        cellView.model.attr('top/stroke','#023E8A');

        if (props.toggleContainer && props.isMobileView)
            props.dispatch(setToggleContainer(false))
    })

    //When clicking on a blank place on the paper
    paper.on('blank:pointerclick',()=>{
        const prevElement = graph.getCell(elementSelected);
        if (prevElement){
            prevElement.attr('path/stroke','black');
            prevElement.attr('body/stroke','black');
            prevElement.attr('top/stroke','black');

        }
        props.dispatch(setElementSelected(null))


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