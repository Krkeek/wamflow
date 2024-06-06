
export interface ShapeInterface {
    id: string,
    name: string,
    SVGUrl: string,
    code: string
}

export interface LinkInterface {
    id: string,
    name: string,
    SVGUrl: string,
    code: string
}

export type ElementForm = {
    name: string,
    uri: string,
    height: number,
    width: number,
    scale: number,
}