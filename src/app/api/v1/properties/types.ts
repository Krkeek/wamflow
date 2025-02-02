import {z} from "zod";
import {Property} from "@/server/models/Property";


export type GETResponseData = {
    success: boolean,
    message: string,
    properties: Property[],
}

export const POSTRequestDataSchema = z.object({
    properties: z.array(
        z.object({
            elementID: z.string(),
            userUID: z.string(),
            name: z.string(),
            value: z.union([z.string(), z.boolean()]),  // Accepts string or boolean
            type: z.string(),
            accountCreated: z.string(),
            active: z.boolean(),
        })
    )
});


