import { z } from "zod";
import { NewPatientFormSchema } from "./PatientSchema";
import { NewDoctorFormSchema } from "./DoctorSchema";

const NewInvestigationSchema = z.object({
    name: z.string().min(2).max(100),
    code: z.string().min(2).max(50),
    specimen: z.string().min(2).max(50)
});

export const NewInvestigationRegisterFormSchema = z.object({
    patient: NewPatientFormSchema,
    doctor: NewDoctorFormSchema,
    investigations: z.array(NewInvestigationSchema),
    date: z.date(),
    cost: z.number()
});

