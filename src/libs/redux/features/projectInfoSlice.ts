import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProjectInfoState {
    name: string
}

const initialState: ProjectInfoState = {
    name: "Untitled"
}

export const projectInfoSlice = createSlice({
    name: 'projectInfo',
    initialState,
    reducers: {
        setProjectInfo: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})

export const { setProjectInfo } = projectInfoSlice.actions

export default projectInfoSlice.reducer