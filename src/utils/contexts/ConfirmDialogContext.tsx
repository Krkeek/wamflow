import { createContext, useContext, useState, ReactNode } from "react";

interface ConfirmDialogOptions {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
}

interface ConfirmDialogContextType {
    showConfirm: (options: ConfirmDialogOptions) => void;
    hideConfirm: () => void;
    dialogOptions: ConfirmDialogOptions | null;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

export const ConfirmDialogProvider = ({ children }: { children: ReactNode }) => {
    const [dialogOptions, setDialogOptions] = useState<ConfirmDialogOptions | null>(null);

    const showConfirm = (options: ConfirmDialogOptions) => {
        setDialogOptions(options);
    };

    const hideConfirm = () => {
        setDialogOptions(null);
    };

    return (
        <ConfirmDialogContext.Provider value={{ showConfirm, hideConfirm, dialogOptions }}>
            {children}
        </ConfirmDialogContext.Provider>
    );
};

export const useConfirmDialog = () => {
    const context = useContext(ConfirmDialogContext);
    if (!context) {
        throw new Error("useConfirmDialog must be used within a ConfirmDialogProvider");
    }
    return context;
};