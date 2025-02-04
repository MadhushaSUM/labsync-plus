import { SearchBoxItem } from "../commonTypes";

export interface PatientType extends SearchBoxItem {
    id?: number;
    name: string;
    date_of_birth: Date;
    gender: "Male" | "Female" | "Other";
    whatsapp_number?: string;
    version: number;
}