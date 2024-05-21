import { configureStore } from '@reduxjs/toolkit'
import {connectionModeSlice} from "@/libs/redux/features/connectionModeSlice";
import {mobileViewSlice} from "@/libs/redux/features/mobileViewSlice";
import {projectInfoSlice} from "@/libs/redux/features/projectInfoSlice";
import {elementSelectedSlice} from "@/libs/redux/features/elementSelectedSlice";
import {linkNameSlice} from "@/libs/redux/features/linkNameSlice";
import {notificationBoxSlice} from "@/libs/redux/features/notificationBoxSlice";
import {mobileToggleContainerSlice} from "@/libs/redux/features/mobileToggleContainerSlice";
import {confirmDialogSlice} from "@/libs/redux/features/confirmDialogSlice";
import {userStatusSlice} from "@/libs/redux/features/userStatusSlice";
import {loadingSlice} from "@/libs/redux/features/loadingSlice";
import {linkSelectedSlice} from "@/libs/redux/features/linkSelectedSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            connectionMode: connectionModeSlice.reducer,
            mobileView: mobileViewSlice.reducer,
            projectInfo: projectInfoSlice.reducer,
            elementSelected: elementSelectedSlice.reducer,
            linkSelected: linkSelectedSlice.reducer,
            linkName: linkNameSlice.reducer,
            notificationBox: notificationBoxSlice.reducer,
            toggleContainer: mobileToggleContainerSlice.reducer,
            confirmDialog: confirmDialogSlice.reducer,
            userStatus: userStatusSlice.reducer,
            loading: loadingSlice.reducer,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']