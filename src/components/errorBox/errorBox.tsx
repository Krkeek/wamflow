import styles from './errorBox.module.css'
import Image from "next/image";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ErrorBoxAnimation} from "@/libs/gsap/ErrorBoxAnimation";
import {useAppSelector} from "@/libs/redux/hooks";



const ErrorBox = () =>{

    const trigger = useAppSelector(state => state.errorBox.trigger)
    const errorBoxMessage = useAppSelector(state => state.errorBox.message)

    useGSAP(()=>{
        const ctx = gsap.context(()=>{
            ErrorBoxAnimation();
        })

        return () => ctx.revert()
    },[errorBoxMessage, trigger])


    if (!errorBoxMessage){
        return (
            <>
            </>
        )
    }
    return(

        <>
            <div className={`${styles.Container} BoxAnimation`}>
                <Image src={'/assets/errorBox.webp'} alt={'error'} width={30} height={30} />
                <p>{errorBoxMessage}</p>
            </div>

        </>
    );

}
export default ErrorBox