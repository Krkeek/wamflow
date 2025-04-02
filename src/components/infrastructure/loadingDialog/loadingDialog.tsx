import styles from './loadingDialog.module.css'
import {useAppSelector} from "@/libs/redux/hooks";
import {memo} from "react";

const LoadingDialog = memo(() => {
    const isLoading = useAppSelector(state => state.loading.isLoading)

    if (!isLoading) return null

    return (
        <>
            {
                isLoading && (
                    <div className={`${styles.Overlay}`}>
                        <div className={`${styles.Container}`}>
                            <div className={styles.Text}>Loading</div>
                            <svg className={styles.SVG} width="35" height="35" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="4" cy="12" r="1.5">
                                    <animate attributeName="r" dur="0.75s" values="1.5;3;1.5" repeatCount="indefinite"/>
                                </circle>
                                <circle cx="12" cy="12" r="3">
                                    <animate attributeName="r" dur="0.75s" values="3;1.5;3" repeatCount="indefinite"/>
                                </circle>
                                <circle cx="20" cy="12" r="1.5">
                                    <animate attributeName="r" dur="0.75s" values="1.5;3;1.5" repeatCount="indefinite"/>
                                </circle>
                            </svg>
                        </div>
                    </div>
                )
            }
        </>
    );
});

LoadingDialog.displayName = "LoadingDialog";
export default LoadingDialog;