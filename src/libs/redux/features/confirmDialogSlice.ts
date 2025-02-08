import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ConfirmDialogState {
    message: string | null,
    trigger: boolean
}

const initialState: ConfirmDialogState = {
    message: null,
    trigger: false
}

export const confirmDialogSlice = createSlice({
    name: 'confirmDialog',
    initialState,
    reducers: {
        setConfirmDialog: (state, action: PayloadAction<string>) => {
            state.message = action.payload
            state.trigger = !state.trigger
        }
    }
})

export const { setConfirmDialog } = confirmDialogSlice.actions

export default confirmDialogSlice.reducer