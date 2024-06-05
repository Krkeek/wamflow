import {dia } from "@joint/core";

export const LegacyRelationship = dia.Link.define('LegacyRelationship', {
    attrs: {
        line: {
            connection: true,
            stroke: 'black',
            strokeWidth: 2,
            strokeLinejoin: 'round',

        },
        wrapper: {
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
            'fill': 'none',
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
