import styles from './elementProperty.module.css'
import React, {Dispatch, SetStateAction, useEffect} from "react";
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
                    {props.property.type === 'boolean' ? (
                        <input
                            className={`${styles.InputRadio}`}
                            type="checkbox"
                            checked={props.property.value === true}
                            onChange={e => {
                                props.setFormData(prevState => ({
                                    ...prevState,
                                    properties: prevState.properties.map(prop=> prop.value === props.property.value && prop.name === props.property.name ? {...prop, value: e.target.checked} : prop)
                                }))
                            }}                        />
                    ) : props.property.type === 'number' ? (
                        <input
                            className={`${styles.Input}`}
                            placeholder={`${props.property.value}`}
                            type="number"
                            value={props.property.value.toString()}
                            onChange={e => {
                                props.setFormData(prevState => ({
                                    ...prevState,
                                    properties: prevState.properties.map(prop=> prop.value === props.property.value && prop.name === props.property.name ? {...prop, value: e.target.value} : prop)
                                }))
                            }}                        />
                    ) : (
                        <input
                            className={`${styles.Input}`}
                            placeholder={`${props.property.value}`}
                            type="text"
                            value={props.property.value.toString()}
                            onChange={e => {
                                props.setFormData(prevState => ({
                                    ...prevState,
                                    properties: prevState.properties.map(prop=> prop.value === props.property.value && prop.name === props.property.name ? {...prop, value: e.target.value} : prop)
                                }))
                            }}                        />
                    )}
                </div>
            </>
    )
}

export default ElementProperty