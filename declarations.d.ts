
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
    properties: IElementProperty[]
}


export type IElementProperty = {
    name: string,
    value: string | boolean | number,
    type: string,
    active: boolean,
}

export interface IGetUserStatus {
    isLoggedIn: boolean,
    userInfo:{
        accountDetails: {
            name: string
            email: string,
        }
        accountCreated: string,
        active: boolean,
        accountPreferences: {
            darkMode: boolean
        }
    } | null
}

