import N3, {Writer} from 'n3'

type nodesType = {
    defaultId: string,
    name: string,
    uri: string
}



const createQuad = (subject: nodesType, predicate: string, object: nodesType) =>{
    const { DataFactory } = N3;
    const { namedNode, literal, defaultGraph, quad } = DataFactory;

    return quad(
        namedNode(subject.defaultId), // Subject
        namedNode(predicate),    // Predicate
        namedNode(object.defaultId), //Object
        defaultGraph(),      // Graph
    )


}

export const exportRDF = (graph: any, projectName: string) =>{

    const writer = new Writer({ prefixes: { wamflow: 'http://wamflow.vercel.app/'}});

    const {elements, relationships} = getElementsAndRelationships(graph);
    console.log(elements)

    // elements.map((element: any)=>{
    //     const wamQuad = createQuad({defaultId: element.defaultId, uri: " ", name: " "}, " ", {defaultId: "",name: "", uri: ""})
    //     writer.addQuad(wamQuad)
    //
    // })
    //

    relationships.map((relation: any)=>{

        const wamQuad = createQuad(relation.sourceData, relation.relationType, relation.targetData)
        writer.addQuad(wamQuad)

    })

    writer.end((error, result) => {
        if (error) {
            console.error(error);
        } else {
            downloadFile(result, `${projectName}.ttl`);
        }
    });
}


const downloadFile = (data: any, filename: any) => {
    const blob = new Blob([data], { type: 'text/turtle' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


const getElementsAndRelationships = (graph: any) => {
    const elements = graph.getElements().map((element: any) => {

        const elementId = element.id;
            return {
                defaultId: elementId
            }
    });

    const relationships = graph.getLinks().map((link: any) => {

        const sourceId = link.get('source').id;
        const targetId = link.get('target').id;
        const sourceEl = graph.getCell(sourceId);
        const targetEl = graph.getCell(targetId);

        const sourceData = {
            defaultId: sourceId,
            name: sourceEl.prop('customData/name'),
            uri: sourceEl.prop('customData/uri')
        }
        const targetData = {
            defaultId: targetId,
            name: targetEl.prop('customData/name'),
            uri: targetEl.prop('customData/uri')
        }


        return {
       sourceData,
       targetData,
            relationType: link.prop('customData/action')
    }});

    return { elements, relationships };
};