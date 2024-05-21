'use client'
import {ShapesData} from "../../dataEntry";

export const getShapeById = (id: string) => {
    return ShapesData.find( shape => shape.id === id)
}