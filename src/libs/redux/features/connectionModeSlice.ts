import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/libs/redux/store'

// Define a type for the slice state
export interface ConnectionModeState {
    value: boolean
}

// Define the initial state using that type
const initialState: ConnectionModeState = {
    value: false
}

export const connectionModeSlice = createSlice({
    name: 'connectionMode',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setConnectionMode: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        }
    }
})

export const { setConnectionMode } = connectionModeSlice.actions

export default connectionModeSlice.reducer