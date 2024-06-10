import {dia} from "@joint/core";
import Paper = dia.Paper;
import {linkViewTools} from "@/libs/joint/linkTools/linkTools";
import Graph = dia.Graph;


type PropsType = {
    elementSelected: any,
    setElementSelectedFn: (el: any) => void
    paper: Paper,
    graph: Graph,
    connectionMode: boolean
}

export const paperEventListener     = (props: PropsType) =>{

    const elementSelected = props.elementSelected;
    const paper = props.paper
    const graph = props.graph;
    const setElementSelected = props.setElementSelectedFn
    const connectionMode = props.connectionMode





    paper.on('element:pointerclick',(cellView)=>{
        if (elementSelected !== null){
            const prevElement = graph.getCell(elementSelected);
            if (prevElement){
                prevElement.attr('path/stroke','black');
                prevElement.attr('body/stroke','black');
                prevElement.attr('top/stroke','black');

            }
        }
        setElementSelected(cellView.model.id);
        cellView.model.attr('path/stroke','#023E8A');
        cellView.model.attr('body/stroke','#023E8A');
        cellView.model.attr('top/stroke','#023E8A');

    })

    //When clicking on a blank place on the paper
    paper.on('blank:pointerclick',()=>{
        const prevElement = graph.getCell(elementSelected);
        if (prevElement){
            prevElement.attr('path/stroke','black');
            prevElement.attr('body/stroke','black');
            prevElement.attr('top/stroke','black');

        }
        setElementSelected(null)
    })

    paper.on('link:mouseenter', function(linkView) {
        connectionMode &&
        linkView.addTools(linkViewTools());
    });

    paper.on('blank:mouseover', function() {
        paper.removeTools();
    });

}