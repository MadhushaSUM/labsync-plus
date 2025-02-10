
export interface PatientType {
    id?: number;
    name: string;
    date_of_birth: Date;
    gender: "Male" | "Female" | "Other";
    whatsapp_number?: string;
    version: number;
}