import styles from './controlButton.module.css'
import Image from "next/image";
type IProps = {
    value?: string
    imgUrl?: string | undefined
    alignItems?: 'center' |'flex-start' | 'flex-end'
    margin?: string;
    transform?: string

}

const ControlButton = (props: IProps) => {


     return (
         <>
             <div style={{ alignItems: props.alignItems, margin: props.margin, transform: props.transform}} className={`${styles.Container}`}>

                 {
                     props.imgUrl !== undefined ? (
                         <>
                             <Image src={props.imgUrl} alt={'icon'} width={20} height={20}/>
                         </>
                     )
                         :
                         <span style={{color: 'black'} }>{props.value}</span>
                 }

             </div>

         </>
     )
}
export default ControlButton