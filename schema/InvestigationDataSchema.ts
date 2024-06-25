import { z } from "zod";

export const FBSFormSchema = z.object({
    fbsValue: z.number(),
    fbsValueFlag: z.string()
});

export const SerumCalciumFormSchema = z.object({
    totalCalcium: z.number(),
    totalCalciumFlag: z.string(),
    ionizedCalcium: z.number(),
    ionizedCalciumFlag: z.string()
});