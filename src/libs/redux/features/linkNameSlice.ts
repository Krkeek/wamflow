import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LinkNameState {
    value: string
}

const initialState: LinkNameState = {
    value: 'invocation'
}

export const linkNameSlice = createSlice({
    name: 'linkName',
    initialState,
    reducers: {
        setLinkName: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const { setLinkName } = linkNameSlice.actions

export default linkNameSlice.reducer