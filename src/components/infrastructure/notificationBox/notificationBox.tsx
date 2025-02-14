import styles from './notificationBox.module.css'
import Image from "next/image";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {NotificationBoxAnimation} from "@/libs/gsap/NotificationBoxAnimation";
import {useAppSelector} from "@/libs/redux/hooks";



const NotificationBox = () =>{

    const trigger = useAppSelector(state => state.notificationBox.trigger)
    const message = useAppSelector(state => state.notificationBox.message)
    const isWarning = useAppSelector(state => state.notificationBox.isWarning)

    useGSAP(()=>{
        const ctx = gsap.context(()=>{
            NotificationBoxAnimation();
        })

        return () => ctx.revert()
    },[message, trigger])


    if (!message){
        return (
            <>
                <div className={`BoxAnimation`}></div>
            </>
        )
    }
    return(

        <>
            <div className={`${styles.Container} BoxAnimation ${isWarning ? styles.isWarning : ' '}`}>
                <Image src={!isWarning ? '/assets/success.webp': '/assets/warning.webp'} alt={'error'} width={30} height={30}/>
                <p>{message}</p>
            </div>

        </>
    );


}

export default NotificationBox;
