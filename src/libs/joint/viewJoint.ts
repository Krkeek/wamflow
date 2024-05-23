'use client'
import {dia, shapes} from '@joint/core'

export const viewJoint = (divElement: HTMLDivElement, graph: any) =>{
    const paper = new dia.Paper({
        el: divElement,
        model: graph,
        width: 1000,
        height: 630,
        gridSize: 1,
        cellViewNamespace: shapes,
         drawGrid: {name: "mesh", args: {color: 'rgba(0, 0, 0, 0.4)'}},
         drawGridSize: 100,

    })
}


