import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ErrorBoxState {
    message: string | null,
    trigger: boolean
}

const initialState: ErrorBoxState = {
    message: null,
    trigger: false
}

export const errorBoxSlice = createSlice({
    name: 'errorBox',
    initialState,
    reducers: {
        setErrorBox: (state, action: PayloadAction<string>) => {
            state.message = action.payload
            state.trigger = !state.trigger
        }
    }
})

export const { setErrorBox } = errorBoxSlice.actions

export default errorBoxSlice.reducer