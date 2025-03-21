import styles from './confirmDialog.module.css';
import { useAppSelector } from "@/libs/redux/hooks";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { NotificationBoxAnimation } from "@/libs/gsap/NotificationBoxAnimation";

const ConfirmDialog = () => {

    const trigger = useAppSelector(state => state.confirmDialog.trigger);
    const confirmMessage = useAppSelector(state => state.confirmDialog.message);
    const lastTriggeredTime = useRef<number | null>(null);

    if (!confirmMessage) {
        return null;
    }

    useGSAP(() => {
        const ctx = gsap.context(() => {
            NotificationBoxAnimation();
        });

        return () => ctx.revert();
    }, [confirmMessage, trigger]);

    useEffect(() => {
        const currentTime = Date.now();
        if (!lastTriggeredTime.current || currentTime - lastTriggeredTime.current > 3000) {
            lastTriggeredTime.current = currentTime;
        }
    }, [trigger]);

    return (
        <div className={`${styles.Container} BoxAnimation`}>
            <p>{confirmMessage}</p>
        </div>
    );
};

export default ConfirmDialog;