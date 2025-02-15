import { z } from "zod";

export const POSTRequestDataSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export const POSTRequestDataGoogleSchema = z.object({
    userInfo: z.any(),
    isNewUser: z.boolean(),
});