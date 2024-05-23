'use client'
import {createContext} from "react";
import {dia, shapes} from "@joint/core";

const namespace = { shapes };
export const defaultGraph = new dia.Graph({},{cellNamespace: namespace});

export const GraphContext = createContext<any>(defaultGraph);
