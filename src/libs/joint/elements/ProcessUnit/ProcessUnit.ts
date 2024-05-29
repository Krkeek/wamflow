import {shapes, util} from "@joint/core";
import {ports} from "@/libs/joint/elements/ProcessUnit/ports";

export const ProcessUnit = shapes.standard.Circle.extend({
    defaults: util.defaultsDeep({
            size: { width: 70, height: 70 },
            type: 'ProcessUnit',
            attrs: {
                title: 'Process Unit',
                name: '',
                uri: '',
                showName: false,
                showUri: false,
                body: {
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

        }, shapes.standard.Circle.prototype.defaults,

        {
            markup: [{
                tagName: 'circle',
                selector: 'body'
            }, {
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
        shapes.standard.Circle.prototype.initialize.apply(this, arguments);
        this.attr('label/text', this.attr('name'));
        this.attr('label2/text', this.attr('uri'));

        this.on('change:attrs', () => {
            this.attr('label/text', this.attr('name'));
            this.attr('label2/text', this.attr('uri'));

        });
    }
});

