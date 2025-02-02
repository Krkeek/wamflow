import {z} from "zod";


export const POSTRequestDataSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
});


export type POSTResponseData = {
    success: boolean,
    message: string,
    data?: any,
}