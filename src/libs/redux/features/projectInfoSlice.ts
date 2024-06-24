import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/libs/redux/store'

// Define a type for the slice state
export interface ProjectInfoState {
    name: string
}

// Define the initial state using that type
const initialState: ProjectInfoState = {
    name: "Untitled"
}

export const projectInfoSlice = createSlice({
    name: 'projectInfo',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setProjectInfo: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})

export const { setProjectInfo } = projectInfoSlice.actions

export default projectInfoSlice.reducer