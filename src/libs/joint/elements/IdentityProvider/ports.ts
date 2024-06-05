
export const ports = {
    items: [

        {
            id: 'port2',
            group: 'rightPort',
        },

        {
            id: 'port3',
            group: 'topPort',
            args: {
                x: "40%",
                y: "40%",
            }
        },
        {
            id: 'port4',
            group: 'bottomPort',
        },

    ],
    groups: {
        'rightPort': {
            position: 'right',
            attrs: {
                circle: {
                    r: 0,
                    magnet: false,
                    stroke: '#023E8A',
                    strokeWidth: 2,
                    fill: '#023E8A'
                }

            }

        },
        'topPort': {
            position: 'relative',
            attrs: {
                circle: {
                    r: 0,
                    magnet: false,
                    stroke: '#023E8A',
                    strokeWidth: 2,
                    fill: '#023E8A'
                }

            }

        },
        'bottomPort': {
            position: 'bottom',
            attrs: {
                circle: {
                    r: 0,
                    magnet: false,
                    stroke: '#023E8A',
                    strokeWidth: 2,
                    fill: '#023E8A'
                }

            }

        },

    }
}