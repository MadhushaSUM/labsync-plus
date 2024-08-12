import { SearchBoxItem } from "../commonTypes";

export interface PatientType extends SearchBoxItem{
    id?: string;
    name: string;
    date_of_birth: string;
    gender: "Male" | "Female" | "Other";
    contact_number: string;
}