import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGetUserStatus } from "../../../../declarations";

const initialState: IGetUserStatus = {
    userInfo: null,
    isLoggedIn: false
};

export const userStatusSlice = createSlice({
    name: 'userStatus',
    initialState,
    reducers: {
        setUserStatus: (state, action: PayloadAction<IGetUserStatus>) => {
            state.userInfo = action.payload.userInfo;
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    }
});

export const { setUserStatus } = userStatusSlice.actions;
export default userStatusSlice.reducer