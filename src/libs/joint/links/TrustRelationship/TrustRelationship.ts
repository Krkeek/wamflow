import { dia, util } from "@joint/core";

export const TrustRelationship = dia.Link.define('TrustRelationship', {
    customData: {
        action: 'trusts',
        label: '',
        showLabel: false,
        title: 'Trust Relationship',
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
        }
    },

    labels: [{
        position: 0.5,
        attrs: {
            text: {
                fontWeight: 600,
                text: '',
                fill: 'black',
                fontSize: 13,
                'text-anchor': 'middle',
                'y-alignment': 'middle',
            }
        }
    }]
}, {
    markup: [
        {
            tagName: 'path',
            selector: 'wrapper',
            attributes: {
                'fill': 'transparent',
                'cursor': 'pointer',
                'stroke': 'transparent'
            }
        },
        {
            tagName: 'path',
            selector: 'line',
            attributes: {
                'fill': 'none',
                'pointer-events': 'none'
            }
        }
    ],
    initialize: function () {
        // @ts-ignore
        dia.Link.prototype.initialize.apply(this, arguments);
        this.updateLabel();

        // Listen for changes in customData.label and update dynamically
        this.on('change:customData/label', this.updateLabel.bind(this));
        this.on('change:attrs', this.updateLabel.bind(this));

    },
    updateLabel: function () {
        const label = this.prop('customData/label') || "Trusts";
        const showLabel = this.prop('customData/showLabel');

        this.label(0, {
            attrs: {
                text: {
                    text: label,
                    display: showLabel ? 'block' : 'none'
                }
            }
        });
    }
});