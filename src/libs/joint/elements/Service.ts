import {dia} from "@joint/core";

export const Service = dia.Element.define("Service", {
        size: { width: 70, height: 65 },

        attrs: {
            title: 'Service',
            name: '',
            uri: '',
            magnet: true,
            path: {
                refDResetOffset: `M31.7544 8.43415C36.7317 -0.186735 49.1748 -0.186749 54.1521 8.43413L82.1492 56.9266C87.1265 65.5475 80.9049 76.3236 70.9504 76.3236H14.9561C5.0016 76.3236 -1.22 65.5475 3.75727 56.9266L31.7544 8.43415Z`,
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
        ports: {
            groups: {
                'in': {
                    position: 'left',
                    attrs: {
                        circle: {
                            r: 3,
                            magnet: true,
                            stroke: '#023E8A',
                            strokeWidth: 2,
                            fill: '#023E8A'
                        }
                    },
                    label: {
                        position: 'left',
                        attrs: {
                            text: {
                                fill: '#6a6c8a'
                            }
                        }
                    }
                },
                'out': {
                    position: 'right',
                    attrs: {
                        circle: {
                            r: 3,
                            magnet: true,
                            stroke: '#023E8A',
                            strokeWidth: 2,
                            fill: '#023E8A',

                        }
                    },
                    label: {
                        position: 'right',
                        attrs: {
                            text: {
                                fill: '#6a6c8a'
                            }
                        }
                    }
                }
            }
        }
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
            this.attr('label/text', this.attr('name'));
            this.attr('label2/text', this.attr('uri'));

            this.on('change:attrs', () => {
                this.attr('label/text', this.attr('name'));
                this.attr('label2/text', this.attr('uri'));

            });
        },
    })

