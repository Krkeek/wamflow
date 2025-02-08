import { configureStore } from '@reduxjs/toolkit'
import {connectionModeSlice} from "@/libs/redux/features/connectionModeSlice";
import {mobileViewSlice} from "@/libs/redux/features/mobileViewSlice";
import {projectInfoSlice} from "@/libs/redux/features/projectInfoSlice";
import {elementSelectedSlice} from "@/libs/redux/features/elementSelectedSlice";
import {linkSelectedSlice} from "@/libs/redux/features/linkSelectedSlice";
import {errorBoxSlice} from "@/libs/redux/features/errorBoxSlice";
import {mobileToggleContainerSlice} from "@/libs/redux/features/mobileToggleContainerSlice";
import {confirmDialogSlice} from "@/libs/redux/features/confirmDialogSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            connectionMode: connectionModeSlice.reducer,
            mobileView: mobileViewSlice.reducer,
            projectInfo: projectInfoSlice.reducer,
            elementSelected: elementSelectedSlice.reducer,
            linkSelected: linkSelectedSlice.reducer,
            errorBox: errorBoxSlice.reducer,
            toggleContainer: mobileToggleContainerSlice.reducer,
            confirmDialog: confirmDialogSlice.reducer,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']