
export const activeConnectionMode = (graph: any) => {

    const elements = graph.getCells();
    elements.forEach((element: any)=>{
        element.prop('locked', true);
        if (element.isElement()){
            const ports = element.getPorts();
            ports.forEach((port: any) => {
                const portGroup = element.portProp(port.id, 'group');
                if (portGroup) {
                    element.portProp(port.id, 'attrs/circle/fill', '#023E8A');
                    element.portProp(port.id, 'attrs/circle/stroke', '#023E8A');

                }
            })
        }

    })

}

export const deactivateConnectionMode = (graph: any) => {
    const elements = graph.getCells();
    elements.forEach((element: any)=>{
        element.prop('locked', false);
        if (element.isElement()){
            const ports = element.getPorts();
            ports.forEach((port: any) => {
                const portGroup = element.portProp(port.id, 'group');
                if (portGroup) {
                    element.portProp(port.id, 'attrs/circle/fill', 'transparent');
                    element.portProp(port.id, 'attrs/circle/stroke', 'transparent');

                }
            })
        }

    })
}