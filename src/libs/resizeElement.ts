import {scaleDimensions} from "@/libs/scaleDimensions";
import {ElementForm} from "../../declarations";
import {setErrorBox} from "@/libs/redux/features/errorBoxSlice";
import {ShapesData} from "../../dataEntry";



export const resizeElement = (formData: ElementForm, elementCellView: any, dispatch: any) =>{


    if (!isNumber(formData.width) || !isNumber(formData.height) || !isNumber(formData.scale)){
        dispatch(setErrorBox('Width, height or scale is not a number'))

    }else {
        let newDimensions: { width: number; height: number };
        //resize
        if (formData.width === 0 && formData.height === 0){
            newDimensions = scaleDimensions(elementCellView.size().width, elementCellView.size().height, formData.scale );

        }
        else if (formData.height === 0 && formData.width !== 0 ) {
            newDimensions = scaleDimensions(formData.width, elementCellView.size().height, formData.scale);

        }
        else if (formData.height !== 0 && formData.width === 0){
            newDimensions = scaleDimensions( elementCellView.size().width, formData.height , formData.scale );
        }
        else {
            newDimensions = scaleDimensions(formData.width, formData.height, formData.scale);
        }

        const isValid = isValidDimensions(elementCellView, newDimensions);

        if (isValid.status){
            elementCellView.resize(newDimensions.width, newDimensions.height)
        }
        else {
            dispatch(setErrorBox(isValid.reason))
        }

    }


}

const isValidDimensions = (elementCellView: any, dimensions: {width: number, height: number}) =>{



    if (elementCellView.attributes.type === 'SecurityRealm'){
        return {
            status: true,
            reason: ''
        }
    }

    if((dimensions.width < 50 && dimensions.height > 500) || (dimensions.width > 500 && dimensions.height < 50)){
        return {
            status: false,
            reason: 'Size allowed between 50px and 500px'
        }
    }
      else if (dimensions.width < 50 || dimensions.height < 50) {
        return {
            status: false,
            reason: 'Minimum size allowed is 50px'
        }
    }
    else if(dimensions.width > 500 || dimensions.height > 500){
        return {
            status: false,
            reason: 'Maximum size allowed is 500px'
        }
    }
    else {
        return {
            status: true,
            reason: ''
        }
    }
}


export const isNumber = (input: any) => {
    const regex = /^[^a-zA-Z\s]+$/;
    return regex.test(input);

}