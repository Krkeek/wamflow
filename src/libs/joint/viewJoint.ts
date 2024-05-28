'use client'
import {dia, shapes} from '@joint/core'

export const viewJoint = (divElement: HTMLDivElement, graph: any) =>{


    return  new dia.Paper({
        el: divElement,
        model: graph,
        width: '100%',
        height: '100%',
        gridSize: 1,
        cellViewNamespace: shapes,
         drawGrid: {name: "mesh", args: {color: 'rgba(0, 0, 0, 0.4)'}},
         drawGridSize: 100,
        defaultLink: () => new shapes.standard.Link(),
        linkPinning: false,
        restrictTranslate: true,

    })
}



