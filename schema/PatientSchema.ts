import { z } from "zod";

const genderEnum = z.enum(["Male", "Female"]);

export const NewPatientFormSchema = z.object({
    name: z.string().min(2).max(100),
    birth_date: z.date(),
    gender: genderEnum,
    phone_number: z.string().min(10).max(15),
});
