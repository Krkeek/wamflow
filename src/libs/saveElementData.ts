import {ElementForm} from "../../declarations";


export const saveElementData = (formData: ElementForm, elementCellView: any) =>{

    //Edit the name and uri
    if (formData.name !== ""){
        elementCellView.attributes.attrs.name = formData.name
    }
    if (formData.uri !== ""){
        elementCellView.attributes.attrs.uri = formData.uri
    }

}