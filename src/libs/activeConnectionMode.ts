
export const activeConnectionMode = (graph: any, mobileView: boolean) => {

    const elements = graph.getCells();
    elements.forEach((element: any)=>{
        element.prop('locked', true);
        if (element.isElement()){
            const ports = element.getPorts();
            ports.forEach((port: any) => {
                const portGroup = element.portProp(port.id, 'group');
                if (portGroup) {
                    element.portProp(port.id, 'attrs/circle/r', mobileView ? 15 : 3);
                    element.portProp(port.id, 'attrs/circle/r', mobileView ? 15 : 3);
                    if (mobileView){
                        element.portProp(port.id, 'attrs/circle/fill', 'transparent');
                        element.portProp(port.id, 'attrs/circle/fill', 'transparent');
                    }
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
                    element.portProp(port.id, 'attrs/circle/r', 0);
                     element.portProp(port.id, 'attrs/circle/r', 0);
                }
            })
        }

    })
}