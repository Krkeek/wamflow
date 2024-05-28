'use client'
import {createContext} from "react";
import {dia, shapes, util} from "@joint/core";



export const SecurityRealm = dia.Element.define("SecurityRealm",{
    size: { width: 250, height: 250 },
    attrs: {

        title: 'Security Realm',
        name: '',
        uri: '',
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
    ports:{
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
                        fill: '#023E8A'
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

    },

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

export const Application = dia.Element.define("Application", {
        size: { width: 70, height: 70 },
        attrs: {
            title: 'Application',
            name: '',
            uri: '',
            magnet: true,
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
        ports:{
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
    }
);



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


export const IdentityProvider = dia.Element.define("IdentityProvider", {
        size: { width: 70, height: 70 },
        attrs: {
            title: 'Identity Provider',
            name: '',
            uri: '',
            magnet: true,
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



export const ProcessUnit = shapes.standard.Circle.extend({
    defaults: util.defaultsDeep({
        size: { width: 70, height: 70 },
        type: 'ProcessUnit',
        attrs: {
            title: 'Process Unit',
            name: '',
            uri: '',
            body: {
                fill: 'white',
                stroke: 'black',
                strokeWidth: 2.2
            }
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
                        title: '',
                        position: 'right',
                        attrs: {
                            text: {
                                fill: 'black'
                            }
                        }
                    },

                }
            }
        },

    }, shapes.standard.Circle.prototype.defaults),

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
                strokeWidth: 2.2
            }
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
    }, shapes.standard.Cylinder.prototype.defaults),

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

const namespace = { shapes, SecurityRealm,  Application, Service, IdentityProvider, DatabaseProvider, ProcessUnit };

export const defaultGraph = new dia.Graph({},{cellNamespace: namespace});

export const GraphContext = createContext<any>(defaultGraph);
