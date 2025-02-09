import styles from './managePropertiesDialog.module.css';
import ModalDialog from "@/components/infrastructure/modalDialog/modalDialog";
import React, { useEffect, useRef, useState } from "react";
import { IElementProperty } from "../../../declarations";
import Image from "next/image";

interface IProps {
    elementCellView: any;
    close: () => void;
}

const ManagePropertiesDialog = (props: IProps) => {

    const [properties, setProperties] = useState<IElementProperty[]>([]);
    const inputRefs = useRef<any>({});

    useEffect(() => {
        setProperties(props.elementCellView.prop("properties") || []);
    }, []);

    const saveProperties = (event: React.FormEvent) => {
        event.preventDefault();

        const updatedProperties = properties.map((property) => ({
            ...property,
            name: inputRefs.current[`name-${property.name}`]?.value || property.name,
            type: inputRefs.current[`type-${property.name}`]?.value || property.type,
            value: inputRefs.current[`value-${property.name}`]?.value || property.value,
            active: inputRefs.current[`active-${property.name}`]?.checked ?? property.active,
        }));

        props.elementCellView.prop("properties", updatedProperties);
        props.close();
    };

    const handleTypeChange = (property: IElementProperty, newType: string) => {
        setProperties((prevProperties) =>
            prevProperties.map((prop) =>
                prop.name === property.name
                    ? { ...prop, type: newType, value: newType === "boolean" ? "false" : prop.value }
                    : prop
            )
        );
    };

    return (
        <div className={styles.LayerContainer}>
            <div className={styles.Container}>
                <ModalDialog>
                        <div className={styles.TitleDiv}>
                            <h2>
                                Manage Properties for {props.elementCellView.prop('customData/title')}
                                {props.elementCellView.prop('customData/name') && (
                                    <div className={styles.Uri}>{props.elementCellView.prop('customData/name')}</div>
                                )}
                            </h2>
                            <div className={styles.Uri}>{props.elementCellView.prop('customData/uri')}</div>
                        </div>

                    <form onSubmit={saveProperties}>
                        <div className={styles.PropertyTableContainer}>

                            <table className={styles.PropertyTable}>
                                <thead>
                                <tr>
                                    <th className={`${styles.Col}`}>Name</th>
                                    <th className={`${styles.Col}`}>Type</th>
                                    <th className={`${styles.Col}`}>Value</th>
                                    <th className={`${styles.Col}`}>Active</th>
                                    <th className={`${styles.Col} ${styles.ActionColMain}`}></th>

                                </tr>
                                </thead>
                                <tbody>
                                {properties.map((property, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="text"
                                                defaultValue={property.name}
                                                ref={(el) => {
                                                    if (el) inputRefs.current[`name-${property.name}`] = el;
                                                }}
                                                className={styles.TextInput}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                defaultValue={property.type}
                                                onChange={(e) => handleTypeChange(property, e.target.value)}
                                                ref={(el) => {
                                                    if (el) inputRefs.current[`type-${property.name}`] = el;
                                                }}
                                                className={styles.SelectInput}
                                            >
                                                <option value="string">String</option>
                                                <option value="number">Number</option>
                                                <option value="boolean">Boolean</option>
                                            </select>
                                        </td>
                                        <td>
                                            {property.type === "boolean" ? (
                                                <select
                                                    defaultValue={property.value.toString()}
                                                    ref={(el) => {
                                                        if (el) inputRefs.current[`value-${property.name}`] = el;
                                                    }}
                                                    className={styles.SelectInput}
                                                >
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </select>
                                            ) : (
                                                <input
                                                    type={property.type === "number" ? "number" : "text"}
                                                    defaultValue={property.value.toString()}
                                                    ref={(el) => {
                                                        if (el) inputRefs.current[`value-${property.name}`] = el;
                                                    }}
                                                    className={styles.TextInput}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                defaultChecked={property.active}
                                                ref={(el) => {
                                                    if (el) inputRefs.current[`active-${property.name}`] = el;
                                                }}
                                                className={styles.CheckBoxInput}
                                            />
                                        </td>
                                        <td className={`${styles.ActionCol}`}>
                                            <Image src={"/assets/trash.webp"} alt={'trash'} width={20} height={20}/>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                        </div>
                        <div className={`${styles.Row} ${styles.AddPropRow}`}>+</div>

                        <div className={styles.ButtonRow}>
                            <button type="submit" className={styles.SaveButton}>Save</button>
                            <button
                                type="button"
                                onClick={props.close}
                                style={{backgroundColor: "var(--danger-color)"}}
                                className={styles.SaveButton}
                            >
                                Discard Changes
                            </button>
                        </div>

                    </form>
                </ModalDialog>
            </div>
        </div>
    );
};

export default ManagePropertiesDialog;