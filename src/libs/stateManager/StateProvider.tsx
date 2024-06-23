import {useContext, useReducer} from "react";
import {initialState, StateContext, stateReducer} from "@/libs/stateManager/StateContext";


export const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(stateReducer, initialState);
    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
    return useContext(StateContext);
};