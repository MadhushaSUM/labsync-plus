import { z } from "zod";

const genderEnum = z.enum(["Male", "Female", "Other"]);

export const NewPatientFormSchema = z.object({
    name: z.string().min(2).max(100),
    dateOfBirth: z.date(),
    gender: genderEnum,
    contactNumber: z.string().min(10).max(15),
});
