            import {dia } from "@joint/core";

             export const Invocation = dia.Link.define('Invocation', {
                 customData: {
                     action: 'invokes',
                 },
                 attrs: {
                     line: {
                         connection: true,
                         stroke: 'black',
                         strokeWidth: 2,
                         strokeLinejoin: 'round',
                         targetMarker: {
                             'type': 'path',
                                 'd': 'M 10 -5 0 0 10 5 z'
                         }
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
