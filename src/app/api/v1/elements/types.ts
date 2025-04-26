import {z} from "zod";
import {WamElement} from "@/server/models/Element";


export type GETResponseData = {
    success: boolean,
    message: string,
    elements: WamElement[],
}

export const POSTRequestDataSchema = z.object({
    element:
        z.object({
            userUID: z.string(),
            type: z.string(),
            name: z.string(),
            uri: z.string(),
            aiComponent: z.boolean(),
            active: z.boolean(),
            svg: z.string(),
        })
});


