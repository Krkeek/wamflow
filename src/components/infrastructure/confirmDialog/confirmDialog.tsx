import styles from './confirmDialog.module.css'
import {useAppSelector} from "@/libs/redux/hooks";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ErrorBoxAnimation} from "@/libs/gsap/ErrorBoxAnimation";

const ConfirmDialog = () => {

    const trigger = useAppSelector(state => state.confirmDialog.trigger)
    const confirmMessage = useAppSelector(state => state.confirmDialog.message)

    useGSAP(()=>{
        const ctx = gsap.context(()=>{
            ErrorBoxAnimation();
        })

        return () => ctx.revert()
    },[confirmMessage, trigger])


    if (!confirmMessage){
        return (
            <>
            </>
        )
    }


    return (
        <>
            <div className={`${styles.Container} BoxAnimation`}>
                <p>{confirmMessage}</p>
            </div>
        </>
    )
}

export default ConfirmDialog