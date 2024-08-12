import { string, z } from "zod";

export const genderEnum = z.enum(["Male", "Female", "Other"]);

export const NewPatientFormSchema = z.object({
    name: z.string().min(2).max(100),
    date_of_birth: z.date().or(string()),
    gender: genderEnum,
    contact_number: z.string().min(10).max(15),
});
