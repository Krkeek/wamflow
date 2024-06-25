

export const exportJSON = (graph: any, name: string) =>{
    const jsonObject = graph.toJSON();
    const jsonString = JSON.stringify(jsonObject, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.download = `${name}.json`;
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}


export const importJSON = async (graph: any, file: any) => {
    const JSONObject = await parseJsonFile(file);
    graph.fromJSON(JSONObject);

}

export const parseJsonFile = async (file: any) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = (event: any) => resolve(JSON.parse(event.target.result))
        fileReader.onerror = error => reject(error)
        fileReader.readAsText(file)
    })
}

