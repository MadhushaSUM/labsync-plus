import { z } from "zod";

export const FBSFormSchema = z.object({
    fbsValue: z.number()
});