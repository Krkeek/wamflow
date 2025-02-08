import styles from './elementProperty.module.css'
import {Dispatch, SetStateAction} from "react";
import {IElementProperty} from "../../../../../declarations";

interface IProps {
    property: IElementProperty,
    formData: {
        name: string,
        uri: string,
        height: number,
        width: number,
        scale: number,
        properties: IElementProperty[]
    },
    setFormData:  Dispatch<SetStateAction<{
      name: string,
        uri: string,
        height: number,
        width: number ,
        scale: number,
        properties: IElementProperty[]
  }>>

}

const ElementProperty = (props: IProps) => {


    return (
        <>
            <label className={`${styles.Label}`}>{props.property.name}</label>
            <div className={`${styles.UriDiv}`}>
                <input className={`${styles.Input}`}
                       placeholder={`${props.property.value}`}
                       value={props.property.value}
                       onChange={e => {
                           props.setFormData(prevState => ({
                               ...prevState,
                               properties: prevState.properties.map(prop=> prop.value === props.property.value && prop.name === props.property.name ? {...prop, value: e.target.value} : prop)
                           }))
                       }}
                />
            </div>
        </>
    )
}

export default ElementProperty