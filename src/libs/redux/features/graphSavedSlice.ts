import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface GraphSavedState {
    status: 'saved' | 'unsaved' | 'error'
}

const initialState: GraphSavedState = {
    status: 'saved',
}

export const graphSavedSlice = createSlice({
    name: 'graphSaved',
    initialState,
    reducers: {
        setGraphSaved: (state, action: PayloadAction<'saved' | 'unsaved' | 'error'>) => {
            state.status = action.payload
        }
    }
})

export const { setGraphSaved } = graphSavedSlice.actions

export default graphSavedSlice.reducer