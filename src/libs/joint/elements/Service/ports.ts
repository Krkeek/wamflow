
export const ports = {
    items: [
        {
            id: 'port1',
            group: 'leftPort',
            args: {
                x: '15%',
                y: '50%',
            },
        },

        {
            id: 'port2',
            group: 'rightPort',
            args: {
                x: '85%',
                y: '50%',
            },
        },

        {
            id: 'port3',
            group: 'topPort',
        },
        {
            id: 'port4',
            group: 'bottomPort',
        },

    ],
    groups: {
        'leftPort': {
            position: 'relative',
            attrs: {
                circle: {
                    r: 0,
                    magnet: true,
                    stroke: '#023E8A',
                    strokeWidth: 2,
                    fill: '#023E8A'
                }

            }

        },
        'rightPort': {
            position: 'relative',
            attrs: {
                circle: {
                    r: 0,
                    magnet: true,
                    stroke: '#023E8A',
                    strokeWidth: 2,
                    fill: '#023E8A'
                }

            }

        },
        'topPort': {
            position: 'top',
            attrs: {
                circle: {
                    r: 0,
                    magnet: true,
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
                    magnet: true,
                    stroke: '#023E8A',
                    strokeWidth: 2,
                    fill: '#023E8A'
                }

            }

        },

    }
}