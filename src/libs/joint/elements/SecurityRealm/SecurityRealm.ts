import {dia, util} from "@joint/core";
import {ports} from "@/libs/joint/elements/SecurityRealm/ports";


export const SecurityRealm = dia.Element.define("SecurityRealm",{
        customData: {
            title: 'Security Realm',
            name: '',
            uri: '',
            showName: true,
            showUri: false,
        },
        properties: [],


        size: { width: 700, height: 400 },
        attrs: {
            magnet: false,
            path: {
                refDResetOffset:  `M7.2 121S0 121 0 114.95L0 6.05S0 0 7.2 0L280.8 0S288 0 289.44 6.05L288 114.95S288 121 280.8 121ZM259.2 0 289.44 24.2`,
                strokeWidth: 2.2,
                stroke: 'black',
                fill: '#E9ECEF',
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
            this.updateLabel();

            this.on('change:customData/name', this.updateLabel.bind(this));
            this.on('change:attrs', this.updateLabel.bind(this));

        },
        updateLabel: function() {
            const name = this.prop('customData/name');
            const labelWidth = this.size().width - 10; // Adjust the width based on element size

            // Break the text to fit inside the element
            const wrappedText = util.breakText(name, { width: labelWidth });

            // Apply the wrapped text to the label
            this.attr('label/text', wrappedText);
            this.attr('label2/text', this.prop('customData/uri'));
        }

    },


)