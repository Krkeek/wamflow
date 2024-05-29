
export const ports = {
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
            },

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
}