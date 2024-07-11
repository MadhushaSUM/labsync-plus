import { SearchBoxItem } from "../commonTypes";

export interface PatientType extends SearchBoxItem{
    id?: number;
    name: string;
    dateOfBirth: string;
    gender: "Male" | "Female" | "Other";
    contactNumber: string;
}