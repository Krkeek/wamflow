import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/libs/redux/store'
import {dia} from "@joint/core";
import ID = dia.Cell.ID;

// Define a type for the slice state
export interface ErrorBoxState {
    message: string | null,
    trigger: boolean
}

// Define the initial state using that type
const initialState: ErrorBoxState = {
    message: null,
    trigger: false
}

export const errorBoxSlice = createSlice({
    name: 'errorBox',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setErrorBox: (state, action: PayloadAction<string>) => {
            state.message = action.payload
            state.trigger = !state.trigger
        }
    }
})

export const { setErrorBox } = errorBoxSlice.actions

export default errorBoxSlice.reducer