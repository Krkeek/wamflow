import styles from './modalDialog.module.css'
import {ReactNode, useEffect, useRef} from "react";
import RoundButton from "@/components/infrastructure/roundButton/roundButton";
import MenuElement from "@/components/infrastructure/menuElement/menuElement";

interface IProps  {
    title?: string,
    titleStyle?: {},
    children?: ReactNode;
    confirmDialog?: {
        enabled: boolean;
        message?: string;
    };
    menuElement?:
        {
            title: string,
            url?: string,
            iconWidth?: string | undefined,
            onClickEvent?: () => void,
        }[],
    titleIcon?: {
        enabled: boolean,
        extended: boolean
        backgroundColor: string
        content?: string
        isIcon?:{
            enabled: boolean,
            url: string,
            width: string
        }
        width: string
        fontSize?: string
    }
    closeDialog?: () => void,
}

const ModalDialog = (props: IProps) => {

    const modalRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                    props.closeDialog && props.closeDialog();
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [modalRef]);

    return (
        <>

                <div className={styles.Container} ref={modalRef}>
                    {
                        props.title !== undefined && (
                            <div className={`${styles.TitleDiv}`} style={props.titleStyle}>
                                {props.titleIcon != undefined && props.titleIcon.enabled && (
                                    <RoundButton extended={props.titleIcon.extended}
                                                 backgroundColor={props.titleIcon.backgroundColor}
                                                 content={props.titleIcon.content} width={props.titleIcon.width}
                                                 fontSize={props.titleIcon.fontSize}/>
                                )}

                                <div className={styles.Title}>{props.title} </div>
                            </div>
                        )
                    }

                    {
                        props.menuElement !== undefined && (
                            <div className={styles.MenuContent}>
                                {
                                    props.menuElement.map((element, index) => (
                                        <MenuElement key={index} title={element.title} url={element.url}
                                                     onClickEvent={element.onClickEvent} iconWidth={element.iconWidth}/>
                                    ))
                                }

                            </div>
                        )
                    }
                    <div className={styles.Content}>{props.children}</div>
                </div>

        </>
    )
}

export default ModalDialog;