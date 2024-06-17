import html2canvas from "html2canvas";
import {dia} from "@joint/core";
import Paper = dia.Paper;


export const exportPNG = (target: any, paper: Paper | null, name: string) => {

    if (paper)
    preparePaper(paper)

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
    resetPaperSetting(paper)

}


const preparePaper = (paper: Paper) => {
    paper.setGrid( {name: "mesh", args: {color: 'transparent'}})
    paper.fitToContent({
        allowNewOrigin: 'any',
        allowNegativeBottomRight: false,
         padding: 5,
    })

}


const resetPaperSetting = (paper: Paper) =>{
    paper.setDimensions('65vw','100%');
    paper.translate(0, 0);
    paper.setGrid( {name: "mesh", args: {color: 'rgba(0, 0, 0, 0.4)'}})

}