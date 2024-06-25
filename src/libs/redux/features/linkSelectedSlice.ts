import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LinkSelectedState {
    value: string
}

const initialState: LinkSelectedState = {
    value: 'invocation'
}

export const linkSelectedSlice = createSlice({
    name: 'linkSelected',
    initialState,
    reducers: {
        setLinkSelected: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const { setLinkSelected } = linkSelectedSlice.actions

export default linkSelectedSlice.reducer