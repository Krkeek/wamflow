import { createTheme } from '@mui/material/styles';
import {createContext} from "react";
import {Theme} from "@mui/system";
import {lime, purple} from "@mui/material/colors";

export const muiTheme = createTheme({
    palette: {
        primary: lime,
        secondary: purple,
    },
});


export const MuiThemeContext = createContext<Theme>(muiTheme);
