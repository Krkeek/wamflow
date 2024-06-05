import {dia } from "@joint/core";

export const TrustRelationship = dia.Link.define('TrustRelationship', {
    attrs: {
        line: {
            fill: 'none',
            connection: true,
            stroke: 'red',
            strokeWidth: 2,
            strokeLinejoin: 'round',
            targetMarker: {
                'position': '50 200',
                'type': 'path',
                'd': `M 10 0 L 0 5 L 10 10 M 10 5 L 0 5`
            }
        },
        wrapper: {
            fill: 'none',

            connection: true,
            strokeWidth: 10,
            strokeLinejoin: 'round'
        }
    }
}, {
    markup: [{
        tagName: 'path',
        selector: 'wrapper',
        attributes: {
            'fill': 'transparent',
            'cursor': 'pointer',
            'stroke': 'transparent'
        }
    }, {
        tagName: 'path',
        selector: 'line',
        attributes: {
            'fill': 'none',
            'pointer-events': 'none'
        }
    }]
});
