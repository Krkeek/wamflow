import styles from './menuElement.module.css'
import RoundButton from "@/components/infrastructure/roundButton/roundButton";

type KeySettings = {
    title: string,
    url?: string,
    iconWidth?: string | undefined,
    onClickEvent?: () => void,

}

const MenuElement = (props: KeySettings) => {
    return(
        <>
            <div onClick={props.onClickEvent} className={`${styles.Container}`}>
                {
                    props.url !== undefined &&(
                        <RoundButton isIcon={{ enabled: true, url: props.url, width: props.iconWidth != undefined ? props.iconWidth : "1.2rem"}} extended={false} backgroundColor={'var(--input-color)'} width={'2.5rem'}/>
                    )
                }
                <div className={`${styles.Title} ${props.url === undefined && styles.ContainerNoIcon }`}>
                    {props.title}
                </div>
            </div>
        </>
    );
}
export default MenuElement;