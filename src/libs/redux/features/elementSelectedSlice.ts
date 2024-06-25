import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ElementSelectedState {
    value: any
}

// Define the initial state using that type
const initialState: ElementSelectedState = {
    value: null
}

export const elementSelectedSlice = createSlice({
    name: 'elementSelected',
    initialState,
    reducers: {
        setElementSelected: (state, action: PayloadAction<any>) => {
            state.value = action.payload
        }
    }
})

export const { setElementSelected } = elementSelectedSlice.actions

export default elementSelectedSlice.reducer