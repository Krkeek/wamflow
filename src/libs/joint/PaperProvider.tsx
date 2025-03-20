
    import {defaultPaper, PaperContext} from "@/libs/joint/PaperContext";

    // @ts-ignore
    const PaperProvider = ({children}) =>{
        return(
            <>
                <PaperContext.Provider value={defaultPaper}>
                    {children}
                </PaperContext.Provider>
            </>
        );
    }
    export default PaperProvider