import styles from './roundButton.module.css'
import Image from "next/image";

type KeySettings = {
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
const RoundButton = (props :  KeySettings) =>{

return(
    <>
        <div className={styles.Circle} style={{
            backgroundColor: props.backgroundColor,
            width: props.width,
        }}>
            {props.isIcon?.enabled && <Image style={{width: props.isIcon.width, height: "auto"}} src={props.isIcon.url} alt={'icon'} width={50} height={50}/>}

            {!props.isIcon?.enabled && (
                <div className={`${styles.Content}`} style={{fontSize: props.fontSize}}>
                    {props.content}
                </div>
            )}

            {props.extended && (
                <div className={styles.ArrowDownCircle}>
                    <svg width="9" height="5" viewBox="-2.5 -5 75 60" preserveAspectRatio="none">
                        <path d="M0,0 l35,50 l35,-50" fill="none" stroke="black" strokeWidth="10"/>
                    </svg>
                </div>
            )}
        </div>

    </>
)

}

export default RoundButton;