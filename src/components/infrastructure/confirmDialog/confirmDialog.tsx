import styles from './confirmDialog.module.css';
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setConfirmDialog} from "@/libs/redux/features/confirmDialogSlice";


const ConfirmDialog = () => {

    const dispatch = useAppDispatch();
    const trigger = useAppSelector(state => state.confirmDialog.trigger);
    const confirmMessage = useAppSelector(state => state.confirmDialog.message);

    if (!trigger) {
        return null;
    }

    const handleConfirm = () => {
        dispatch(setConfirmDialog({trigger: false}));
    }
    const handleCancel = () => {
        dispatch(setConfirmDialog({trigger: false}));
    }

    return (
        <div className={`${styles.Container}`}>
            <p>{confirmMessage}</p>
            <button onClick={handleConfirm}>Confirm</button>
        </div>
    );
};

export default ConfirmDialog;