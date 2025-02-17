import {dia, util} from "@joint/core";
import {ports} from "@/libs/joint/elements/Service/ports";

export const Service = dia.Element.define("Service", {

        customData: {
            title: 'Service',
            name: '',
            uri: '',
            showName: true,
            showUri: false,
        },
        properties: [],

        size: { width: 70, height: 65 },
        attrs: {
            magnet: false,
            path: {
                refDResetOffset: `M31.7544 8.43415C36.7317 -0.186735 49.1748 -0.186749 54.1521 8.43413L82.1492 56.9266C87.1265 65.5475 80.9049 76.3236 70.9504 76.3236H14.9561C5.0016 76.3236 -1.22 65.5475 3.75727 56.9266L31.7544 8.43415Z`,
                strokeWidth: 2.2,
                stroke: 'black',
                fill: '#E9ECEF',
                cursor: 'move'

            },
            label: {
                text: '',
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                fontSize: 12,
                fill: '#333333',
                refX: "50%",
                refY: "65%",
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
    })

