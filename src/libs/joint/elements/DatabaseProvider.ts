import {shapes, util} from "@joint/core";

export const DatabaseProvider = shapes.standard.Cylinder.extend({
    defaults: util.defaultsDeep({
            size: { width: 60, height: 70 },
            attrs: {
                title: 'Database Provider',
                name: '',
                uri: '',
                type: 'DatabaseProvider',
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
            ports   : {
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
                            title: '',
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
        shapes.standard.Cylinder.prototype.initialize.apply(this, arguments);
        this.attr('label/text', this.attr('name'));
        this.attr('label2/text', this.attr('uri'));

        this.on('change:attrs', () => {
            this.attr('label/text', this.attr('name'));
            this.attr('label2/text', this.attr('uri'));

        });
    }

});
