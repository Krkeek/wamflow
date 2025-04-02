import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ConfirmDialogState {
    message?: string | null,
    trigger: boolean
}

const initialState: ConfirmDialogState = {
    message: "Are you sure you want to confirm this action?",
    trigger: true
}

export const confirmDialogSlice = createSlice({
    name: 'confirmDialog',
    initialState,
    reducers: {
        setConfirmDialog: (state, action: PayloadAction<ConfirmDialogState>) => {
            state.trigger = action.payload.trigger
            state.message = action.payload.message
        }
    }
})

export const { setConfirmDialog } = confirmDialogSlice.actions

export default confirmDialogSlice.reducer