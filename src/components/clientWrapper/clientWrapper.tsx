'use client';


import {StateProvider} from "@/libs/stateManager/StateProvider";

const ClientWrapper = ({ children }:any) => {
    return <StateProvider>{children}</StateProvider>;
};

export default ClientWrapper;
