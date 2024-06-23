import {createContext} from "react";

export const StateContext = createContext<any>(null);

export type StateInterface = {
    mobileView: boolean,
    connectionMode: boolean
}

export const initialState: StateInterface = {
    mobileView: false,
    connectionMode: true,
};

export const stateReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'setMobileView':
            return {
                ...state,
                mobileView: action.payload,
            };
        case 'setConnectionMode':
            return {
                ...state,
                connectionMode: action.payload,
            };
        default:
            return state;
    }
};