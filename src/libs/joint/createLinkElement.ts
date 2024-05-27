import {dia} from "@joint/core";

export const createLinkElement = (sourceId: number, targetId: string | null) =>{

    return new dia.Link({
        source: {id: sourceId},
        target: {id: targetId},
        attrs: {
            '.connection': {stroke: 'black', 'stroke-width': 2},
            '.marker-source': {fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z'},  // Example of a custom marker
            '.marker-target': {fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z'}   // Example of a custom marker
        },
    })

}