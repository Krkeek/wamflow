'use client'
import {createContext} from "react";
import {dia, shapes} from "@joint/core";
import {Invocation} from "@/libs/joint/links/Invocation/Invocation";
import {LegacyRelationship} from "@/libs/joint/links/LegacyRelationship/LegacyRelationship";
import {TrustRelationship} from "@/libs/joint/links/TrustRelationship/TrustRelationship";
import {defaultGraph} from "./GraphContext";


const linkSelected = 'invocation'
export const defaultPaper = new dia.Paper({
    model: defaultGraph,
    width: '100vw',
    height: '200vh',
    gridSize: 1,
    cellViewNamespace: shapes,
    background: {color: '#E9ECEF'},
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
                elementMove: false,
                linkMove: false,
                labelMove: true,
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
            name: 'stroke',
            options: {
                padding: 2
            }
        },
        'connecting': {
            name: 'addClass',
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
export const PaperContext = createContext<any>(defaultPaper);
