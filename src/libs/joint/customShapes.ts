// import {dia, shapes, util} from "@joint/core";
// import { getShapeById } from "../getShapeById";
//
//
// export const defineCustomShapes = (elementId: string) =>{
//
//     // @ts-ignore
//     // const element =  dia.Element.define(elementId,{
//     //     size: {
//     //         width: 200,
//     //         height: 200
//     //     },
//     //     attrs: {
//     //         name: "test",
//     //         type: "typeTest",
//     //         uri: "www.test.com",
//     //     },
//     //
//     //     markup: util.svg `
//     //     ${getShapeById(elementId)?.code}
//     //     `
//     //
//     // })
//
//
//     const element = dia.Element.define(elementId, {
//         attrs: {
//             magnet: true,
//             body: {
//                 width: 'calc(w)',
//                 height: 'calc(h)',
//                 strokeWidth: 2,
//                 stroke: '#000000',
//                 fill: '#FFFFFF',
//                 rx: '10',
//                 ry: '10'
//             },
//             label: {
//                 textVerticalAnchor: 'middle',
//                 textAnchor: 'middle',
//                 x: 'calc(0.5*w)',
//                 y: 'calc(0.5*h)',
//                 fontSize: 14,
//                 fill: '#333333'
//             },
//
//         },
//         ports:{
//             groups: {
//                 'in': {
//                     position: 'left',
//                     attrs: {
//                         circle: {
//                             r: 6,
//                             magnet: true,
//                             stroke: '#31d0c6',
//                             strokeWidth: 2,
//                             fill: 'red'
//                         }
//                     },
//                     label: {
//                         position: 'left',
//                         attrs: {
//                             text: {
//                                 fill: '#6a6c8a'
//                             }
//                         }
//                     }
//                 },
//                 'out': {
//                     position: 'right',
//                     attrs: {
//                         circle: {
//                             r: 6,
//                             magnet: true,
//                             stroke: '#31d0c6',
//                             strokeWidth: 2,
//                             fill: 'blue'
//                         }
//                     },
//                     label: {
//                         position: 'right',
//                         attrs: {
//                             text: {
//                                 fill: '#6a6c8a'
//                             }
//                         }
//                     }
//                 }
//             }
//
//
//
//
//         }
//
//
//     },
//         {
//         markup: [{
//             tagName: 'rect',
//             selector: 'body',
//         }, {
//             tagName: 'text',
//             selector: 'label'
//         }]
//     }
//
//
//     );
//
//
//     Object.assign(shapes, {
//     myNamespace: {
//         element
//     }
// });
//     return element
//
// }
//
