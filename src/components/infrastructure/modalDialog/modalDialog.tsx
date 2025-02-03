import styles from './modalDialog.module.css'
import {ReactNode} from "react";
import RoundButton from "@/components/infrastructure/roundButton/roundButton";
import MenuElement from "@/components/infrastructure/menuElement/menuElement";

interface IProps  {
    title?: string,
    children?: ReactNode;
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
}

const ModalDialog = (props: IProps) => {
    return (
        <>

            <div className={styles.Container}>
                {
                    props.title !== undefined && (
                        <div className={styles.TitleDiv}>
                            {props.titleIcon != undefined && props.titleIcon.enabled && (
                                <RoundButton extended={props.titleIcon.extended} backgroundColor={props.titleIcon.backgroundColor} content={props.titleIcon.content} width={props.titleIcon.width} fontSize={props.titleIcon.fontSize} />
                            )}

                            <div className={styles.Title}>{props.title} </div>
                        </div>
                    )
                }

                {
                    props.menuElement !== undefined && (
                        <div className={styles.Content}>
                            {
                                props.menuElement.map((element, index)=>(
                                        <MenuElement key={index} title={element.title} url={element.url} onClickEvent={element.onClickEvent} iconWidth={element.iconWidth} />
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