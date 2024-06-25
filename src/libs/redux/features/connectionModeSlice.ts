import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ConnectionModeState {
    value: boolean
}

const initialState: ConnectionModeState = {
    value: false
}

export const connectionModeSlice = createSlice({
    name: 'connectionMode',
    initialState,
    reducers: {
        setConnectionMode: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        }
    }
})

export const { setConnectionMode } = connectionModeSlice.actions

export default connectionModeSlice.reducer