'use client'
import {dia, shapes} from '@joint/core'
import {Invocation} from "@/libs/joint/links/Invocation/Invocation";
import {LegacyRelationship} from "@/libs/joint/links/LegacyRelationship/LegacyRelationship";
import {TrustRelationship} from "@/libs/joint/links/TrustRelationship/TrustRelationship";

export const viewJoint = (divElement: HTMLDivElement, graph: any, linkSelected: string) =>{


    return  new dia.Paper({
        el: divElement,
        model: graph,
        width: '100%',
        height: '100%',
        gridSize: 1,
        cellViewNamespace: shapes,
         drawGrid: {name: "mesh", args: {color: 'rgba(0, 0, 0, 0.4)'}},
         drawGridSize: 100,
         defaultLink: () => {
            if (linkSelected === 'invocation')
                 return new Invocation();
            else if (linkSelected === 'trustRelationship')
                return new TrustRelationship();
            else
                return new LegacyRelationship();

         },
        linkPinning: false,
        defaultConnectionPoint: { name: "boundary" },

        interactive: function(cellView) {
            if (cellView.model.prop('locked')) {
                return {
                    elementMove: false
                };
            }
            return true;
        },

        restrictTranslate: true,
        embeddingMode: true,
        validateEmbedding: (childView, parentView) =>{
            const parentModel = parentView.model;
            return parentModel.get('type') === 'SecurityRealm';
        },
        highlighting: {
            'default': {
                name: 'stroke', // `joint.highlighters.stroke`
                options: {
                    padding: 2
                }
            },
            'connecting': {
                name: 'addClass',  // `joint.highlighters.addClass`
                options: {
                    className: 'highlight-connecting'
                }
            },
            // Disable highlighter for embedding
            'embedding': false
        },

        validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
            // Prevent linking from a port to itself
            return cellViewS !== cellViewT;

        }
    });


}


