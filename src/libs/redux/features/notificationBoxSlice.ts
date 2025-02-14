import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NotificationBoxState {
    message: string | null,
    trigger: boolean,
    isWarning?: boolean,
}

const initialState: NotificationBoxState = {
    message: null,
    trigger: false,
    isWarning: false,
}

export const notificationBoxSlice = createSlice({
    name: 'notificationBox',
    initialState,
    reducers: {
        setNotificationBox: (state, action: PayloadAction<{ message: string, isWarning?: boolean}>) => {
            state.message = action.payload.message
            state.trigger = !state.trigger
            state.isWarning = action.payload.isWarning ?? false
        }
    }
})

export const { setNotificationBox } = notificationBoxSlice.actions

export default notificationBoxSlice.reducer