import {ElementForm, IElementProperty} from "../../declarations";


export const saveElementData = (formData: ElementForm, elementCellView: any) =>{

    //Edit the name and uri
    if (formData.name !== ""){
        elementCellView.prop('customData/name',formData.name)
    }
    if (formData.uri !== ""){
        elementCellView.prop('customData/uri',formData.uri)
    }
    if (formData.properties.length != 0){
        const newProperties: IElementProperty[] = formData.properties;
        const prevProperties: IElementProperty[] = elementCellView.prop('properties');

        const updatedProperties = prevProperties.map(property => {
            const newProperty = newProperties.find(p => p.name === property.name);
            return newProperty ? { ...property, value: newProperty.value } : property;
        });

        elementCellView.prop('properties', updatedProperties);

    }

}