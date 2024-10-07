import {dia, shapes, util} from "@joint/core";
import {ports} from "@/libs/joint/elements/DatabaseProvider/ports";

export const DatabaseProvider = shapes.standard.Cylinder.extend({
    defaults: util.defaultsDeep({
            customData: {
                title: 'Database Provider',
                name: '',
                uri: '',
                showName: true,
                showUri: false,
            },

            size: { width: 60, height: 70 },
            type: 'DatabaseProvider',
            attrs: {
                body: {
                    fill: 'white',
                    stroke: 'black',
                    strokeWidth: 2.2,
                },
                top: {
                    fill: 'white',
                    stroke: 'black',
                    strokeWidth: 2.2
                },
                label: {
                    text:'',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    x: 'calc(0.5*w)',
                    y: 'calc(0.5*h)',
                    fontSize: 12,
                    fill: '#333333'
                },
                label2: {
                    title: '',
                    textVerticalAnchor: 'top',
                    textAnchor: 'middle',
                    fontSize: 12,
                    fill: '#333333',
                    refX: "50%",
                    refDy: 5
                },

            },
            ports: ports
        }, shapes.standard.Cylinder.prototype.defaults,

        {
            markup: [{
                tagName: 'path',
                selector: 'body'
            },
                {
                    tagName: 'ellipse',
                    selector: 'top'
                }


                , {
                    tagName: 'text',
                    selector: 'label'
                }, {
                    tagName: 'text',
                    selector: 'label2'
                }]
        }

    ),
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

});
