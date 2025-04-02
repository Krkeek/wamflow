

// @ts-ignore
import {muiTheme, MuiThemeContext} from "@/utils/contexts/MuiThemeContext";

const MuiThemeProvider = ({children}:any) =>{
    return(
        <>
            <MuiThemeContext.Provider value={muiTheme}>
                {children}
            </MuiThemeContext.Provider>
        </>
    );
}
export default MuiThemeProvider