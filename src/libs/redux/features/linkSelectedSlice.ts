import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/libs/redux/store'
import {dia} from "@joint/core";
import ID = dia.Cell.ID;

// Define a type for the slice state
export interface LinkSelectedState {
    value: string
}

// Define the initial state using that type
const initialState: LinkSelectedState = {
    value: 'invocation'
}

export const linkSelectedSlice = createSlice({
    name: 'linkSelected',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setLinkSelected: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const { setLinkSelected } = linkSelectedSlice.actions

export default linkSelectedSlice.reducer