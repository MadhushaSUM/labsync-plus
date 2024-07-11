import { z } from "zod";

export const NewDoctorFormSchema = z.object({
    name: z.string().min(2).max(100),
    post: z.string().min(2).max(100)
});
