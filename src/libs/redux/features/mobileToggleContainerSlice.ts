import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface mobileToggleContainerState {
    value: boolean
}

const initialState: mobileToggleContainerState = {
    value: false
}

export const mobileToggleContainerSlice = createSlice({
    name: 'mobileToggleContainer',
    initialState,
    reducers: {
        setToggleContainer: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        }
    }
})

export const { setToggleContainer } = mobileToggleContainerSlice.actions

export default mobileToggleContainerSlice.reducer