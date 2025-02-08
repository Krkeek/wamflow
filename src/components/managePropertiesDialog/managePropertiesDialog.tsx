import styles from './managePropertiesDialog.module.css'
import ModalDialog from "@/components/infrastructure/modalDialog/modalDialog";
import {useEffect, useState} from "react";
import {IElementProperty} from "../../../declarations";

interface IProps {
    elementCellView: any,
    close: () => void,
}

const ManagePropertiesDialog = (props: IProps) => {

    const [properties, setProperties] = useState<IElementProperty[] | undefined>();


    useEffect(() => {
        setProperties(props.elementCellView.prop("properties"));
    }, []);


    return(
        <>
            <div className={styles.LayerContainer}>
            <div className={`${styles.Container}`}>
                <ModalDialog
                >
                    <div className={`${styles.TitleDiv}`}>
                        <div className={styles.Title}>Manage Properties for {props.elementCellView.prop('customData/title')}
                            {
                                props.elementCellView.prop('customData/name') !== "" && (
                                    <div className={styles.Uri}>
                                        {props.elementCellView.prop('customData/name')}
                                    </div>
                                )
                            }

                        </div>
                        <div className={`${styles.Uri}`}>{props.elementCellView.prop('customData/uri')}</div>
                    </div>
                        <div className={`${styles.Table}`}>
                            <div className={`${styles.Row} ${styles.MainRow}`}>
                                <div className={`${styles.Col}`}>
                                    Name

                                </div>
                                <div className={`${styles.Col}`}>
                                    Type

                                </div>
                                <div className={`${styles.Col}`}>
                                    Value
                                </div>
                                <div className={`${styles.Col}`}>
                                    Active
                                </div>
                            </div>
                            <div className={`${styles.TableContent}`}>

                                {
                                    properties?.map((property: IElementProperty, index: number) => {
                                        return (
                                            <div key={index} className={`${styles.Row}`}>
                                                <div className={`${styles.Col}`}>
                                                    {property.name}
                                                </div>
                                                <div className={`${styles.Col}`}>
                                                    {property.type}

                                                </div>
                                                <div className={`${styles.Col}`}>
                                                    {property.value.toString()}
                                                </div>
                                                <div className={`${styles.Col}`}>
                                                    {property.active.toString()}
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className={`${styles.Row} ${styles.AddPropRow}`}>
                                +
                            </div>
                            <div className={`${styles.Row} ${styles.ButtonRow}`}>
                                <button
                                    className={`${styles.SaveButton}`}>Save
                                </button>
                                <button onClick={props.close} style={{backgroundColor: "var(--danger-color)"}}
                                        className={`${styles.SaveButton}`}>Discard Changes
                                </button>
                            </div>

                        </div>


                </ModalDialog>
            </div>
            </div>

        </>
)
}

export default ManagePropertiesDialog;