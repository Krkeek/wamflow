import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MobileViewState {
    value: boolean
}

const initialState: MobileViewState = {
    value: false
}

export const mobileViewSlice = createSlice({
    name: 'mobileView',
    initialState,
    reducers: {
        setMobileView: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        }
    }
})

export const { setMobileView } = mobileViewSlice.actions

export default mobileViewSlice.reducer