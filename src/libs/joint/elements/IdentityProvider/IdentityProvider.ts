import {dia} from "@joint/core";
import {ports} from "@/libs/joint/elements/IdentityProvider/ports";

export const IdentityProvider = dia.Element.define("IdentityProvider", {
        customData: {
            title: 'Identity Provider',
            name: '',
            uri: '',
            showName: false,
            showUri: false,
        },

        size: { width: 70, height: 70 },
        attrs: {
            magnet: false,
            path: {
                refDResetOffset: `M74.3946 65.3453V11.8404C74.3946 3.30662 64.0769 -0.967114 58.0426 5.06717L4.53775 58.5721C-1.49653 64.6063 2.77722 74.924 11.311 74.924H64.8158C70.106 74.924 74.3946 70.6355 74.3946 65.3453Z`,
                strokeWidth: 2.2,
                stroke: 'black',
                fill: 'white',
                cursor: 'move'

            },
            label: {
                text: '',
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                fontSize: 12,
                fill: '#333333',
                refX: "63%",
                refY: "70%",
            },
            label2: {
                text: '',
                textVerticalAnchor: 'top',
                textAnchor: 'middle',
                fontSize: 12,
                fill: '#333333',
                refX: "50%",
                refDy: 5

            },

        },
        ports: ports
    },
    {
        markup: [{
            tagName: 'path',
            selector: 'path',
        }, {
            tagName: 'text',
            selector: 'label'
        }
            ,
            {
                tagName: 'text',
                selector: 'label2'
            },
        ],
        initialize: function() {
            // @ts-ignore
            dia.Element.prototype.initialize.apply(this, arguments);
            this.attr('label/text', this.prop('customData/name'));
            this.attr('label2/text', this.prop('customData/uri'));

            this.on('change:attrs', () => {
                this.attr('label/text', this.prop('customData/name'));
                this.attr('label2/text', this.prop('customData/uri'));

            });
        },
    })

