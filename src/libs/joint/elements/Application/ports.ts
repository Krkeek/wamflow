
export const ports = {
    items: [
        {
            id: 'port1',
            group: 'leftPort',
        },

        {
            id: 'port4',
            group: 'rightPort',
        },

        {
            id: 'port7',
            group: 'topPort',
        },
        {
            id: 'port10',
            group: 'bottomPort',
        },

    ],
    groups: {
        'leftPort': {
            position: 'left',
            attrs: {
                circle: {
                    r: 3,
                    magnet: true,
                    stroke: '#023E8A',
                    strokeWidth: 2,
                    fill: '#023E8A'
                }

            }

        },
        'rightPort': {
            position: 'right',
            attrs: {
                circle: {
                    r: 3,
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
                    r: 3,
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
                    r: 3,
                    magnet: true,
                    stroke: '#023E8A',
                    strokeWidth: 2,
                    fill: '#023E8A'
                }

            }

        },

    }
}