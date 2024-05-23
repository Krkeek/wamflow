'use client'
import {defineCustomShapes} from "@/libs/joint/customShapes";

export const createJointElement = (elementId: string, graph: any) =>{
    console.log(elementId)
    const customShape =  defineCustomShapes(elementId);
    const element = new customShape()
    if (element){
        element.position(100,30);
        element.resize(500,500);
        element.addTo(graph)
    }

}


