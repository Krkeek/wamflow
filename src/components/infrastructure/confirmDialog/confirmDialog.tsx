import {useConfirmDialog} from "@/utils/contexts/ConfirmDialogContext";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
const ConfirmDialog = () => {
    const { dialogOptions, hideConfirm } = useConfirmDialog();

    if (!dialogOptions) return null;

    return (
        <Dialog open={Boolean(dialogOptions)} onClose={hideConfirm}>
            <DialogTitle>{dialogOptions.title || "Are you sure?"}</DialogTitle>
            <DialogContent>{dialogOptions.message || "Do you want to proceed?"}</DialogContent>
            <DialogActions>
                <Button sx={{ color: "black" }}  onClick={hideConfirm}>{dialogOptions.cancelText || "Cancel"}</Button>
                <Button
                    onClick={() => {
                        if (dialogOptions.onConfirm) dialogOptions.onConfirm();
                        hideConfirm();
                    }}
                    color="primary"
                    sx={{color: "023E8A" }}
                >
                    {dialogOptions.confirmText || "Confirm"}
                </Button>
            </DialogActions>
        </Dialog>
)
    ;
};

export default ConfirmDialog;