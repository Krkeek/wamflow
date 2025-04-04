import {dia} from "@joint/core";

export interface Graph {
    userId: string;
    graphData: dia.Graph;
    elementSelected?: string;
    linkSelected?: string
    createdAt?: string;
    updatedAt?: string;
}