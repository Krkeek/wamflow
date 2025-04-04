import {z} from "zod";

export const POSTRequestDataSchema = z.object({
    graph: z.object({
        cells: z.array(
            z.object({
                id: z.string(),
                type: z.string(),
                attrs: z.object({
                    body: z.object({
                        fill: z.string(),
                        stroke: z.string(),
                    }),
                }),
                position: z.object({
                    x: z.number(),
                    y: z.number(),
                }),
                size: z.object({
                    width: z.number(),
                    height: z.number(),
                }),
            })
        ),
    }),
});