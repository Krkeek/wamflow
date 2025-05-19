import html2canvas from "html2canvas";
import {dia} from "@joint/core";
import Paper = dia.Paper;


export const exportPNG = (paper: Paper | null, name: string, graph: dia.Graph) => {

    const target = paper?.el;

    if (paper)
    preparePaper(paper, graph)

    if (target){
        html2canvas(target)
            .then((canvas) =>{
                const based64image = canvas.toDataURL('image/png');
                const anchor = document.createElement('a');
                anchor.setAttribute('href', based64image)
                anchor.setAttribute('download', name)
                anchor.click()
                anchor.remove()
            })
    }

    if (paper)
    resetPaperSetting(paper, graph)
}


const preparePaper = (paper: Paper, graph: dia.Graph) => {
    paper.drawBackground({ color: 'transparent' });
    paper.setGrid( {name: "mesh", args: {color: 'transparent'}})
    paper.fitToContent({
        allowNewOrigin: 'any',
        allowNegativeBottomRight: false,
         padding: 5,
    })

    graph.getElements().forEach((element) => {
        element.attr({
            path: {
                fill: '#FFFFFF'
            },
            body: {
                fill: '#FFFFFF'
            },
            top: {
                fill: '#FFFFFF'
            }
        });
    });

}


const resetPaperSetting = (paper: Paper, graph: dia.Graph) =>{
    paper.setDimensions('200vw','200vh');
    paper.translate(0,0);


    graph.getElements().forEach((element) => {
        element.attr({
            path: {
                fill: '#E9ECEF'
            },
            body: {
                fill: '#E9ECEF'
            },
            top: {
                fill: '#E9ECEF'
            }
        });
    });
}