import styles from './errorBox.module.css'
import Image from "next/image";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ErrorBoxAnimation} from "@/libs/gsap/ErrorBoxAnimation";

type PropsType = {
    alert: string | null;
    setErrorBox: (error: string | null) => void;
    trigger: boolean

}



//Maximum size allowed is 500px
const ErrorBox = (props: PropsType) =>{


    useGSAP(()=>{
        const ctx = gsap.context(()=>{
            ErrorBoxAnimation();
        })

        return () => ctx.revert()
    },[props.alert, props.trigger])




    if (!props.alert){
        return (
            <>
            </>
        )
    }
    return(

        <>
            <div className={`${styles.Container} BoxAnimation`}>
                <Image src={'/assets/errorBox.webp'} alt={'error'} width={30} height={30} />
                <p>{props.alert}</p>
            </div>

        </>
    );

}
export default ErrorBox