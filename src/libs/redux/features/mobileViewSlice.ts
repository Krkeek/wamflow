import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/libs/redux/store'

// Define a type for the slice state
export interface MobileViewState {
    value: boolean
}

// Define the initial state using that type
const initialState: MobileViewState = {
    value: false
}

export const mobileViewSlice = createSlice({
    name: 'mobileView',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setMobileView: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        }
    }
})

export const { setMobileView } = mobileViewSlice.actions

export default mobileViewSlice.reducer