import { z } from "zod";

export const genderEnum = z.enum(["Male", "Female", "Other"]);

export const NewPatientFormSchema = z.object({
    name: z.string().min(2).max(100),
    date_of_birth: z.date(),
    gender: genderEnum,
    whatsapp_number: z.string().min(10).max(12),
});
