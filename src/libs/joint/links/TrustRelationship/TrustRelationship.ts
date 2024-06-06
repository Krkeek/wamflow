import {dia } from "@joint/core";

export const TrustRelationship = dia.Link.define('TrustRelationship', {
    customData: {
        action: 'trusts',
    },
    attrs: {
        line: {
            fill: 'none',
            connection: true,
            stroke: 'black',
            strokeWidth: 2,
            strokeLinejoin: 'round',
            targetMarker: {
                'type': 'path',
                'd': 'M 10 -5 L 0 0 L 10 5 ',
                'stroke': 'black',
                'fill': 'none',
                'stroke-width': 2
            }
        },
        wrapper: {
            fill: 'none',
            connection: true,
            strokeWidth: 10,
            strokeLinejoin: 'round'
        },
        label: {
            text: 'Hello',
            fill: 'red',
            fontSize: 11,
            fontVariant: 'small-caps'
        }
    },

    labels: [{
        position: 0.5,
        attrs: {
            text: {
                fontWeight: 600,
                text: 'Trusts',
                fill: 'black',
                fontSize: 13,
                'text-anchor': 'middle',
                'y-alignment': 'middle',
            }
        }
    }]


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
    }
    ]
});
