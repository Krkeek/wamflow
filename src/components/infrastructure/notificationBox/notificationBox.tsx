import styles from './notificationBox.module.css';
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { NotificationBoxAnimation } from "@/libs/gsap/NotificationBoxAnimation";
import { useAppSelector } from "@/libs/redux/hooks";
import { useEffect, useRef, memo } from "react";

const NotificationBox = () => {
    const trigger = useAppSelector(state => state.notificationBox.trigger);
    const message = useAppSelector(state => state.notificationBox.message);
    const isWarning = useAppSelector(state => state.notificationBox.isWarning);

    const lastTriggeredTime = useRef<number | null>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            NotificationBoxAnimation();
        });

        return () => ctx.revert();
    }, [message, trigger]);

    useEffect(() => {
        const currentTime = Date.now();
        if (!lastTriggeredTime.current || currentTime - lastTriggeredTime.current > 3000) {
            lastTriggeredTime.current = currentTime;
        }
    }, [trigger]);

    if (!message) {
        return null;
    }

    return (
        <div className={`${styles.Container} BoxAnimation ${isWarning ? styles.isWarning : ''}`}>
            <Image src={!isWarning ? '/assets/success.webp' : '/assets/warning.webp'} alt={'error'} width={30} height={30} />
            <p>{message}</p>
        </div>
    );
}

export default memo(NotificationBox);