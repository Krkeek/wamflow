import {dia} from "@joint/core";
import {ports} from "@/libs/joint/elements/SecurityRealm/ports";


export const SecurityRealm = dia.Element.define("SecurityRealm",{
        customData: {
            title: 'Security Realm',
            name: '',
            uri: '',
            showName: false,
            showUri: false,
        },

        size: { width: 700, height: 400 },
        attrs: {
            magnet: false,
            path: {
                refDResetOffset:  `M7.2 121S0 121 0 114.95L0 6.05S0 0 7.2 0L280.8 0S288 0 289.44 6.05L288 114.95S288 121 280.8 121ZM259.2 0 289.44 24.2`,
                strokeWidth: 2.2,
                stroke: 'black',
                fill: 'white',
                cursor: 'move',

            },
            label: {
                text: '',
                textVerticalAnchor: 'top',
                textAnchor: 'middle',
                fontSize: 12,
                fill: '#333333',
                refX: "96%",
                refY: "5%",

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
        ports : ports

    },
    {
        markup: [ {
            tagName: 'path',
            selector: 'path',
        }, {
            tagName: 'text',
            selector: 'label'
        },
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

    },


)