import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/libs/redux/store'
import {dia} from "@joint/core";
import ID = dia.Cell.ID;

// Define a type for the slice state
export interface ElementSelectedState {
    value: any
}

// Define the initial state using that type
const initialState: ElementSelectedState = {
    value: null
}

export const elementSelectedSlice = createSlice({
    name: 'elementSelected',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setElementSelected: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        }
    }
})

export const { setElementSelected } = elementSelectedSlice.actions

export default elementSelectedSlice.reducer