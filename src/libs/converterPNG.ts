import html2canvas from "html2canvas";


export const exportPNG = (target: any, name: string) => {

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

}