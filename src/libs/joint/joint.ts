import {dia, shapes} from '@joint/core'


export const joint = (element: any) =>{
     const graph = new dia.Graph({},{cellNamespace: shapes});
     new dia.Paper({
        el: element,
        model: graph,
        width: 1000,
        height: 630,
        gridSize: 1,
        cellViewNamespace: shapes,
         drawGrid: {name: "mesh", args: {color: 'rgba(0, 0, 0, 0.4)'}},
         drawGridSize: 100,

    })

}



