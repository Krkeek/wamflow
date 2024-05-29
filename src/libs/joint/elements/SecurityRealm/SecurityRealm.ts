import {dia} from "@joint/core";
import {ports} from "@/libs/joint/elements/SecurityRealm/ports";


export const SecurityRealm = dia.Element.define("SecurityRealm",{
        size: { width: 250, height: 250 },
        attrs: {

            title: 'Security Realm',
            name: '',
            uri: '',
            showName: false,
            showUri: false,
            magnet: true,
            path: {
                refDResetOffset:  `M 10,100
            S 0,100 0,90
            L 0,10
            S 0,0 10,0
            L 90,0
            S 100,0 100,10
            L 100,90
            S 100,100 90,100
            Z M 75,0
            L 100,25`,
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
                refX: "50%",
                refY: -15,

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
            this.attr('label/text', this.attr('name'));
            this.attr('label2/text', this.attr('uri'));

            this.on('change:attrs', () => {
                this.attr('label/text', this.attr('name'));
                this.attr('label2/text', this.attr('uri'));

            });
        },

    },


)