import {dia, linkTools} from "@joint/core";


export const linkViewTools = () => {

    const verticesTool = new linkTools.Vertices();
    const segmentsTool = new linkTools.Segments();
    const sourceArrowheadTool = new linkTools.SourceArrowhead();
    const targetArrowheadTool = new linkTools.TargetArrowhead();
    const sourceAnchorTool = new linkTools.SourceAnchor();
    const targetAnchorTool = new linkTools.TargetAnchor();
    const boundaryTool = new linkTools.Boundary();
    const removeButton = new linkTools.Remove();

    return new dia.ToolsView({
        tools: [
            // verticesTool,
            segmentsTool,
            sourceArrowheadTool, targetArrowheadTool,
            sourceAnchorTool, targetAnchorTool,
            boundaryTool, removeButton
        ]
    });

}