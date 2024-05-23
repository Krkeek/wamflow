
    import {defaultGraph, GraphContext} from "./GraphContext";

    // @ts-ignore
    const GraphProvider = ({children}) =>{
        return(
            <>
                <GraphContext.Provider value={defaultGraph}>
                    {children}
                </GraphContext.Provider>
            </>
        );
    }
    export default GraphProvider