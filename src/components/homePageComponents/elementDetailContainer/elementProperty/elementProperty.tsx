import styles from './elementProperty.module.css'
import Image from "next/image";
import {Dispatch, SetStateAction} from "react";

interface IProps {
  elementCellView: any,
    formData: {
        name: string,
        uri: string,
        height: number,
        width: number,
        scale: number,
    },
    setFormData:  Dispatch<SetStateAction<{
      name: string,
        uri: string,
        height: number,
        width: number ,
        scale: number
  }>>
    ,
    elementUpdated: boolean,
    setElementUpdated: any,
}

const ElementProperty = (props: IProps) => {

    const handleShowName = () =>{
        props.elementCellView.prop('customData/showName', !props.elementCellView.prop('customData/showName'))
        props.setElementUpdated(!props.elementUpdated)
    }


    return (
        <>
            <label className={`${styles.Label}`}>Property</label>
            <div className={`${styles.UriDiv}`}>
                <input className={`${styles.Input}`}
                       placeholder={`${props.elementCellView.prop('customData/name')}`}
                       value={props.formData.name} // Set the value from formData
                       onChange={e => {
                           props.setFormData(prevState => ({
                               ...prevState,
                               name: e.target.value
                           }))
                       }}
                />
            </div>
        </>
    )
}

export default ElementProperty