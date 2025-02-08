import {dia, util} from "@joint/core";
import {ports} from "@/libs/joint/elements/Application/ports";

export const Application = dia.Element.define("Application", {
        size: { width: 70, height: 70 },
        customData: {
            title: 'Application',
            name: '',
            uri: '',
            showName: true,
            showUri: false,
        },
        properties: [
            {
                name: "Property1",
                value: "Value1",
                type: "string",
                active: "boolean",
            },
            {
                name: "Property2",
                value: "Value2",
                type: "string",
                active: "boolean",
            },
            {
                name: "Property3",
                value: "Value3",
                type: "string",
                active: "boolean",
            },
            {
                name: "Property4",
                value: "Value4",
                type: "string",
                active: "boolean",
            },
        ],
        attrs: {
            path: {
                refDResetOffset:  `M1.94713 15.1788C1.94713 8.03705 7.73668 2.24748 14.8785 2.24748H72.351C79.4928 2.24748 85.2823 8.03704 85.2823 15.1788V72.6513C85.2823 79.7931 79.4928 85.5827 72.351 85.5827H14.8785C7.73669 85.5827 1.94713 79.7931 1.94713 72.6513V15.1788Z`,
                strokeWidth: 2.2,
                stroke: 'black',
                fill: 'white',
                cursor: 'move'

            },
            label: {
                title:'',
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                x: 'calc(0.5*w)',
                y: 'calc(0.5*h)',
                fontSize: 12,
                fill: '#333333'
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
    }
);

