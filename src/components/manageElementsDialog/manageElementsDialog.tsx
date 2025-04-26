import styles from "@/components/manageElementsDialog/manageElementsDialog.module.css";
import ModalDialog from "@/components/infrastructure/modalDialog/modalDialog";
import React, {FormEvent, useRef, useState} from "react";
import {setIsLoading} from "@/libs/redux/features/loadingSlice";
import {useDispatch} from "react-redux";
import Image from "next/image";
import {decodeJwt} from "jose";
import {setNotificationBox} from "@/libs/redux/features/notificationBoxSlice";
import {useConfirmDialog} from "@/utils/contexts/ConfirmDialogContext";

interface IProps {
    isOpen: boolean;
    setIsOpenAction: (isOpen: boolean) => void;

}

const ManageElementsDialog = (props: IProps) => {
    const inputFile = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();
    const [svgPreview, setSvgPreview] = useState<string | null>(null);
    const { showConfirm } = useConfirmDialog();

    const [formData, setFormData] = useState<{
        type: string,
        name: string,
        uri: string,
        aiComponent: boolean
        svg: string
    }>({
        type: '',
        name: '',
        uri: '',
        aiComponent: false,
        svg: ''
    })

    const handleImport = () =>{
        dispatch(setIsLoading(true));
        if (inputFile.current)
            inputFile.current.click();
        dispatch(setIsLoading(false));
    }

    const handleSvgUpload = async (event: any) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const text = await file.text();
        const fileURL = URL.createObjectURL(file);

        setSvgPreview(fileURL);

        setFormData(prevState => ({
            ...prevState,
            svg: text
        }))

/*        const svgElement = new CustomElement({
            attrs: {
                svg: {
                    html: text,
                }
            }
        });*/
    };


    const handleSaveElement = async (event: FormEvent<HTMLFormElement>) => {
        dispatch(setIsLoading(true));
        event.preventDefault();


        if (formData.svg === ''){
            dispatch(setNotificationBox({message:`SVG shape is required`, isWarning: true}));
            dispatch(setIsLoading(false));
            return;
        }

        if (document.cookie) {
            const accessToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('JWT='))
                ?.split('=')[1];

            if (!accessToken)
                throw new Error('No access token');

            try {

                const userID = decodeJwt(accessToken).user_id;
                const requestData = {
                    element: {
                        userUID: userID,
                        type: formData.type,
                        name: formData.name,
                        uri: formData.uri,
                        aiComponent: formData.aiComponent,
                        active: true,
                        svg: formData.svg,
                    }
                }

                const response = await fetch('/api/v1/elements', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(requestData),
                });

                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status}`);
                }
                const res = await response.json();
                dispatch(setNotificationBox({message: 'Element is created successfully'}));
                props.setIsOpenAction(false);
                setFormData({
                    type: '',
                    name: '',
                    uri: '',
                    aiComponent: false,
                    svg: ''
                })
                setSvgPreview(null)
            } catch (error) {
                console.error("Error saving element:", error);
            }
        }
        dispatch(setIsLoading(false));

    }

    const handleDiscardChanges = () => {
        showConfirm({
            title: "Discard Changes",
            message: "Are you sure you want to discard all changes?",
            confirmText: "Discard",
            cancelText: "Cancel",
            onConfirm: () => {
                props.setIsOpenAction(false);
                setFormData({
                    type: '',
                    name: '',
                    uri: '',
                    aiComponent: false,
                    svg: ''
                })
                setSvgPreview(null)
                dispatch(setNotificationBox({message: `All changes have been discarded`, isWarning: true}));

            },
        });
    }

    if (!props.isOpen) return null;

    return (
        <div className={styles.LayerContainer}>
            <div className={styles.Container}>
                <ModalDialog>
                    <div className={styles.TitleDiv}>
                        <h3>
                            Create Element
                        </h3>
                    </div>
                    <form onSubmit={handleSaveElement}>

                        <label className={`${styles.Label}`}>Type*</label>
                        <input
                            required
                            className={`${styles.Input}`}
                            type="text"
                            value={formData.type}
                            onChange={e => {
                                setFormData(prevState => ({
                                    ...prevState,
                                    type: e.target.value
                                }))
                            }}/>
                        <label className={`${styles.Label}`}>Name</label>
                        <input
                            className={`${styles.Input}`}
                            type="text"
                            value={formData.name}
                            onChange={e => {
                                setFormData(prevState => ({
                                    ...prevState,
                                    name: e.target.value
                                }))
                            }}
                        />
                        <label className={`${styles.Label}`}>Uri</label>
                        <input
                            className={`${styles.Input}`}
                            type="text"
                            value={formData.uri}
                            onChange={e => {
                                setFormData(prevState => ({
                                    ...prevState,
                                    uri: e.target.value
                                }))
                            }}
                        />


                        <div className={`${styles.RadioButtonWrapper}`}>
                            <input
                                className={`${styles.InputRadio}`}
                                type="checkbox"
                                checked={formData.aiComponent}
                                onChange={e => {
                                    setFormData(prevState => ({
                                        ...prevState,
                                        aiComponent: e.target.checked
                                    }))
                                }}
                            />
                            <label className={`${styles.Label}`}>AI Component</label>
                        </div>
                        <input
                            ref={inputFile}
                            className={`${styles.FileInput}`}
                            type="file"
                            accept=".svg"
                            onChange={handleSvgUpload}
                        />
                        <div onClick={handleImport} className={`${styles.SvgPreview}`}>
                            {!svgPreview ? 'Upload a Shape'
                                : <Image className={`${styles.ImagePrev}`} src={svgPreview} alt={'svg'} width={20}
                                         height={20}/>}
                        </div>

                        <div className={styles.ButtonRow}>
                            <button type={"submit"} className={styles.SaveButton}>Save</button>
                            <button
                                type="button"
                                style={{backgroundColor: "var(--danger-color)"}}
                                className={styles.SaveButton}
                                onClick={handleDiscardChanges}
                            >
                                Discard Changes
                            </button>
                        </div>

                    </form>
                </ModalDialog>
            </div>
        </div>
    )

}

export default ManageElementsDialog;