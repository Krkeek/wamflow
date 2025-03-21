'use client'
import {createContext} from "react";
import {dia} from "@joint/core";


export const PaperContext = createContext<dia.Paper | null>(null);
