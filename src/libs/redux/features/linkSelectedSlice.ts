import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LinkSelectedState {
    value: any
}

// Define the initial state using that type
const initialState: LinkSelectedState = {
    value: null
}

export const linkSelectedSlice = createSlice({
    name: 'linkSelected',
    initialState,
    reducers: {
        setLinkSelected: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        }
    }
})

export const { setLinkSelected } = linkSelectedSlice.actions

export default linkSelectedSlice.reducer